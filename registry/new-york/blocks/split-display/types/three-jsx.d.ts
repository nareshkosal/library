// Type declarations for Three.js JSX elements
import '@react-three/fiber'

// Ensure the JSX namespace includes Three.js elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends import('@react-three/fiber').ThreeElements {}
  }
}

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements extends import('@react-three/fiber').ThreeElements {}
  }
}

declare module 'react/jsx-dev-runtime' {
  namespace JSX {
    interface IntrinsicElements extends import('@react-three/fiber').ThreeElements {}
  }
}