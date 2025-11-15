#!/bin/bash

# Build the CLI
echo "Building kosal CLI..."
cd kosal-cli
npm run build

# Link for local testing
echo "Linking CLI for local testing..."
npm link

echo "✅ CLI built and linked successfully!"
echo "You can now test with:"
echo "  kosal init"
echo "  kosal add <component-name>"