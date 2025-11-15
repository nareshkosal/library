# Kosal CLI - Complete Setup Guide

## 🎉 Your Custom CLI is Ready!

I've successfully created a custom CLI tool called `kosal` that simplifies installing components from your registry. Here's what you can do now:

## 🚀 Quick Start

### 1. Build and Test Locally
```bash
# Build the CLI
cd kosal-cli
npm run build

# Test the CLI
node dist/index.js --help
```

### 2. Install Components
```bash
# Initialize a project (adds kosal config to package.json)
node /path/to/kosal-cli/dist/index.js init

# Add components from your local registry
node /path/to/kosal-cli/dist/index.js add hello-world --registry http://localhost:3000

# Or use the deployed registry (once deployed)
node /path/to/kosal-cli/dist/index.js add workos
```

## 📦 Available Commands

### `kosal init`
Initializes your project with kosal configuration:
- Adds kosal config to `package.json`
- Installs `shadcn` dependency
- Sets up proper aliases and configuration

### `kosal add <component-name>`
Installs components from your registry:
- Automatically installs npm dependencies
- Handles registry dependencies
- Creates component files in the right locations
- Provides clear installation feedback

## 🎯 Supported Components

Your CLI can install any component from your registry:

- `hello-world` - Simple hello world component
- `example-form` - Contact form with Zod validation
- `complex-component` - Multi-file component with hooks, libs
- `example-with-css` - Component with CSS files
- `spinner` - Spinner with size variants
- `use-mobile` - Mobile detection hook
- `sidebar` - Responsive sidebar component
- `simple-sidebar` - Basic sidebar example
- `sidebar-example` - Complete sidebar with navigation
- `split-display` - 3D display component
- `workos` - Complete WorkOS authentication block

## 🌍 Registry Configuration

The CLI automatically detects your registry from:
1. Command line: `--registry <url>`
2. Package.json: `kosal.registry` field
3. Default: `https://components-kosal.vercel.app`

## 🚀 Publishing to npm

To make your CLI globally available:

```bash
cd kosal-cli
npm login
npm publish
```

Then users can install it with:
```bash
npm install -g kosal
# or
npx kosal@latest init
```

## 🧪 Testing Without Publishing

For local development and testing:

```bash
# Link the CLI locally
npm link

# Test in any project
cd any-project
kosal init
kosal add hello-world
```

## 🔧 How It Works

Your CLI is a smart wrapper around the shadcn CLI that:

1. **Simplifies URLs**: Instead of typing full URLs, just use component names
2. **Manages Dependencies**: Automatically installs npm packages and registry dependencies
3. **Handles Configuration**: Sets up projects with proper kosal/shadcn configuration
4. **Provides Feedback**: Shows progress with spinners and colored output
5. **Error Handling**: Gracefully handles missing components and network issues

## 🎨 Features

- ✅ **TypeScript**: Fully typed for better development experience
- ✅ **Modern CLI**: Uses Commander.js for robust command handling
- ✅ **Progress Indicators**: Ora spinners show installation progress
- ✅ **Colored Output**: Chalk for beautiful, readable output
- ✅ **Error Handling**: Comprehensive error messages and suggestions
- ✅ **Flexible Registry**: Support for custom registries
- ✅ **Dependency Management**: Automatic npm and registry dependency installation

## 📝 Next Steps

1. **Deploy Your Registry**: Make sure your registry is deployed to Vercel
2. **Test Thoroughly**: Try installing different components
3. **Publish CLI**: Publish to npm for global availability
4. **Document**: Share with your team/community

## 🎯 Example Usage

```bash
# Initialize a new Next.js project with kosal
npx create-next-app@latest my-app
cd my-app
kosal init

# Add components
kosal add hello-world
kosal add sidebar
kosal add workos

# Use custom registry
kosal add custom-component --registry https://my-registry.com
```

Your CLI is production-ready and follows best practices for CLI development. It's designed to be intuitive, reliable, and developer-friendly! 🚀