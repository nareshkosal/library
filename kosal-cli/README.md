# Kosal CLI

A custom CLI tool for installing components from the Kosal registry.

## Installation

### Global Installation (Recommended)
```bash
npm install -g kosal
```

### Local Installation
```bash
npm install kosal
```

### Using npx (No Installation)
```bash
npx kosal@latest init
npx kosal@latest add <component-name>
```

## Usage

### Initialize a project
```bash
kosal init
```

This command will:
- Add kosal configuration to your `package.json`
- Install the `shadcn` dependency
- Set up the necessary aliases and configuration

### Add a component
```bash
kosal add <component-name>
```

Examples:
```bash
kosal add hello-world
kosal add workos
kosal add sidebar
kosal add complex-component
```

### Use a custom registry
```bash
kosal add <component-name> --registry https://your-registry.com
```

## Available Components

Based on your registry, you can install:

- `hello-world` - A simple hello world component
- `example-form` - A contact form with Zod validation
- `complex-component` - A complex component with hooks, libs and components
- `example-with-css` - A login form with a CSS file
- `spinner` - A spinner component with different size variants
- `use-mobile` - A hook that detects if the user is on a mobile device
- `sidebar` - A responsive sidebar component
- `simple-sidebar` - A simple sidebar example
- `sidebar-example` - A complete sidebar example
- `split-display` - A 3D video display component
- `workos` - Complete authentication block with WorkOS AuthKit

## Configuration

The CLI looks for configuration in the following order:

1. Command line options (e.g., `--registry`)
2. `kosal.registry` field in `package.json`
3. Default registry: `https://components-kosal.vercel.app`

## Development

### Building the CLI
```bash
cd kosal-cli
npm install
npm run build
```

### Testing locally
```bash
npm link
kosal init
kosal add hello-world
```

### Publishing to npm
```bash
npm publish
```

## How it Works

The Kosal CLI is a wrapper around the shadcn CLI that:

1. **Simplifies commands**: Instead of typing long URLs, you just use component names
2. **Manages dependencies**: Automatically installs npm dependencies and registry dependencies
3. **Handles configuration**: Sets up your project with the right configuration
4. **Provides feedback**: Shows progress and results with nice formatting

The CLI fetches component data from your registry JSON files and uses the shadcn CLI internally to install components, ensuring compatibility with the existing ecosystem.