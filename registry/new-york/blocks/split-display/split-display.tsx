'use client';

import { Canvas } from '@react-three/fiber'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Custom Shader Material for UV cropping
const VideoCropMaterial = shaderMaterial(
  {
    map: null,
    uvOffset: new THREE.Vector2(0, 0),
    uvScale: new THREE.Vector2(1, 1),
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  // fragment shader
  `
    uniform sampler2D map;
    uniform vec2 uvOffset;
    uniform vec2 uvScale;
    varying vec2 vUv;
    void main() {
      vec2 croppedUv = vUv * uvScale + uvOffset;
      gl_FragColor = texture2D(map, croppedUv);
    }
  `
)

extend({ VideoCropMaterial })

declare module 'react' {
  interface IntrinsicElements {
    videoCropMaterial: {
      map?: THREE.Texture
      uvOffset?: [number, number]
      uvScale?: [number, number]
    }
  }
}

declare module 'react/jsx-runtime' {
  interface IntrinsicElements {
    videoCropMaterial: {
      map?: THREE.Texture
      uvOffset?: [number, number]
      uvScale?: [number, number]
    }
  }
}

declare module 'react/jsx-dev-runtime' {
  interface IntrinsicElements {
    videoCropMaterial: {
      map?: THREE.Texture
      uvOffset?: [number, number]
      uvScale?: [number, number]
    }
  }
}

// Panel types and constants
export type Panel = {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
}

const panels: Panel[] = [
  { position: [-1.6, 2.5, -0.2], rotation: [0, -0.25, 0], size: [2, 2.5] },
  { position: [1.1, 2.5, 1.0], rotation: [0, 0.25, -0.1], size: [2, 2.8] },
  { position: [0, 0, 0.5], rotation: [0, 0, 0], size: [2.3, 4] },
  { position: [-0.9, -2.5, -0.2], rotation: [0, -0.2, 0.06], size: [1.7, 2.8] },
  { position: [0.9, -2.5, -0.2], rotation: [0, 0.2, -0.12], size: [1.8, 2.6] },
]

function getPanelsBoundingBox(panels: Panel[]) {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity
  panels.forEach(({ position, size }) => {
    const [x, y] = position
    const [w, h] = size
    minX = Math.min(minX, x - w / 2)
    maxX = Math.max(maxX, x + w / 2)
    minY = Math.min(minY, y - h / 2)
    maxY = Math.max(maxY, y + h / 2)
  })
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY }
}

// Video Panel Component
function VideoPanel({
  video,
  position,
  rotation,
  size,
  uvOffset,
  uvScale,
  isCenter = false,
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
}: {
  video: HTMLVideoElement | null
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  uvOffset: [number, number]
  uvScale: [number, number]
  isCenter?: boolean
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
}) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null)

  useEffect(() => {
    if (!video) return
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBAFormat
    videoTexture.flipY = true
    videoTexture.colorSpace = THREE.SRGBColorSpace
    setTexture(videoTexture)
    return () => videoTexture.dispose()
  }, [video])

  useFrame(() => {
    if (texture && video && video.readyState >= video.HAVE_CURRENT_DATA) {
      texture.needsUpdate = true
    }
  })

  if (!texture) return null

  return (
    <group position={position} rotation={rotation}>
      {showFrame && (
        <mesh>
          <planeGeometry args={[size[0] + (isCenter ? framePaddingCenter : framePadding), size[1] + (isCenter ? framePaddingCenter : framePadding)]} />
          <meshBasicMaterial color={frameColor} />
        </mesh>
      )}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={size} />
        {/* @ts-expect-error */}
        <videoCropMaterial map={texture} uvOffset={uvOffset} uvScale={uvScale} />
      </mesh>
    </group>
  )
}

// Video Panel Group Component
function VideoPanelGroup({
  video,
  panels,
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
}: {
  video: HTMLVideoElement | null
  panels: Panel[]
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
}) {
  const bbox = getPanelsBoundingBox(panels)

  return (
    <>
      {panels.map((panel, i) => {
        const [x, y] = panel.position
        const [w, h] = panel.size
        const u0 = (x - w / 2 - bbox.minX) / bbox.width
        const u1 = (x + w / 2 - bbox.minX) / bbox.width
        const v0 = (y - h / 2 - bbox.minY) / bbox.height
        const v1 = (y + h / 2 - bbox.minY) / bbox.height
        const uvOffset: [number, number] = [u0, v0]
        const uvScale: [number, number] = [u1 - u0, v1 - v0]

        return (
          <VideoPanel
            key={i}
            video={video}
            position={panel.position}
            rotation={panel.rotation}
            size={panel.size}
            uvOffset={uvOffset}
            uvScale={uvScale}
            isCenter={i === 2}
            showFrame={showFrame}
            frameColor={frameColor}
            framePadding={framePadding}
            framePaddingCenter={framePaddingCenter}
          />
        )
      })}
    </>
  )
}

// Mouse Rotate Group Component
function MouseRotateGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.y = (e.clientX / window.innerWidth) * 2 - 1
      target.current.x = (e.clientY / window.innerHeight) * 2 - 1
      target.current.y *= 0.5
      target.current.x *= 0.3
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.08
      group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.08
    }
  })

  return <group ref={group}>{children}</group>
}

// Scene Background Component
function SceneBackground({ color }: { color?: string }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = color ? new THREE.Color(color) : null
  }, [color, scene])
  return null
}

// Video Element Hook
function useVideoElement(videoUrl: string) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!videoUrl) return
    const videoElement = document.createElement('video')
    videoElement.src = videoUrl
    videoElement.crossOrigin = 'anonymous'
    videoElement.loop = true
    videoElement.muted = true
    videoElement.playsInline = true
    videoElement.preload = 'auto'
    videoElement.style.position = 'absolute'
    videoElement.style.width = '1px'
    videoElement.style.height = '1px'
    videoElement.style.top = '-9999px'
    videoElement.style.left = '-9999px'
    document.body.appendChild(videoElement)

    const handleCanPlay = () => {
      videoElement.play().then(() => setIsPlaying(true)).catch(() => {})
    }

    videoElement.addEventListener('canplay', handleCanPlay)
    videoElement.addEventListener('loadeddata', () => setVideo(videoElement))
    videoElement.addEventListener('play', () => setIsPlaying(true))
    videoElement.addEventListener('pause', () => setIsPlaying(false))

    videoElement.load()

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay)
      if (document.body.contains(videoElement)) {
        document.body.removeChild(videoElement)
      }
    }
  }, [videoUrl])

  useEffect(() => {
    if (video && !isPlaying) {
      const tryPlay = () => {
        video
          .play()
          .then(() => {
            setIsPlaying(true)
            document.removeEventListener('click', tryPlay)
            document.removeEventListener('touchstart', tryPlay)
          })
          .catch(() => {})
      }
      document.addEventListener('click', tryPlay)
      document.addEventListener('touchstart', tryPlay)
      return () => {
        document.removeEventListener('click', tryPlay)
        document.removeEventListener('touchstart', tryPlay)
      }
    }
  }, [video, isPlaying])

  return video
}

// Main Split Display Component
export type SplitDisplayProps = {
  videoUrl?: string
  showDebug?: boolean
  showLoadingOverlay?: boolean
  loadingOverlayClassName?: string
  debugPanelClassName?: string
  showFrame?: boolean
  frameColor?: string
  framePadding?: number
  framePaddingCenter?: number
  backgroundColor?: string
  canvasAlpha?: boolean
  sceneBackgroundColor?: string
  containerClassName?: string
  containerStyle?: CSSProperties
  containerProps?: HTMLAttributes<HTMLDivElement>
}

export function SplitDisplay({
  videoUrl = '',
  showDebug = false,
  showLoadingOverlay = true,
  loadingOverlayClassName = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white',
  debugPanelClassName = 'absolute top-4 right-4 w-fit bg-black bg-opacity-70 text-white p-3 rounded-lg text-sm',
  showFrame = true,
  frameColor = '#111111',
  framePadding = 0.06,
  framePaddingCenter = 0.1,
  backgroundColor = 'black',
  canvasAlpha = false,
  sceneBackgroundColor,
  containerClassName = '',
  containerStyle,
  containerProps = {},
}: SplitDisplayProps) {
  const video = useVideoElement(videoUrl)

  return (
    <div
      {...containerProps}
      className={[
        'w-full h-screen',
        containerClassName,
        containerProps.className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        position: 'relative',
        background: backgroundColor,
        ...(containerProps.style || {}),
        ...(containerStyle || {}),
      }}
    >
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }} gl={{ antialias: true, alpha: canvasAlpha }}>
        <SceneBackground color={sceneBackgroundColor} />
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 8]} intensity={0.3} color="#8b5cf6" />
        <MouseRotateGroup>
          <VideoPanelGroup
            video={video}
            panels={panels}
            showFrame={showFrame}
            frameColor={frameColor}
            framePadding={framePadding}
            framePaddingCenter={framePaddingCenter}
          />
        </MouseRotateGroup>
      </Canvas>
      {!video && showLoadingOverlay && (
        <div className={loadingOverlayClassName}>Loading video...</div>
      )}
      {showDebug && video && (
        <div className={debugPanelClassName}>
          <div>Status: {video.paused ? 'Paused' : 'Playing'}</div>
          <div>Ready State: {video.readyState}/4</div>
          <div>Current Time: {video.currentTime.toFixed(1)}s</div>
          <div>Duration: {video.duration ? `${video.duration.toFixed(1)}s` : 'Unknown'}</div>
        </div>
      )}
    </div>
  )
}

export default SplitDisplay