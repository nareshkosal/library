import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

export async function initCommand() {
  console.log(chalk.blue('🚀 Initializing kosal configuration...'));

  try {
    // Check if we're in a project directory
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    if (!await fs.pathExists(packageJsonPath)) {
      console.log(chalk.red('❌ No package.json found. Please run this in your project directory.'));
      return;
    }

    // Read existing package.json
    const packageJson = await fs.readJson(packageJsonPath);

    // Add kosal configuration
    const kosalConfig = {
      "$schema": "https://ui.shadcn.com/schema/registry-item.json",
      "rsc": true,
      "tsx": true,
      "tailwind": {
        "config": "tailwind.config.js",
        "css": "app/globals.css",
        "baseColor": "slate",
        "cssVariables": true,
        "prefix": ""
      },
      "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks"
      },
      "registry": "https://components-kosal.vercel.app"
    };

    // Add kosal config to package.json
    packageJson.kosal = kosalConfig;

    // Add shadcn dependency if not present
    if (!packageJson.devDependencies?.shadcn) {
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      packageJson.devDependencies.shadcn = "^3.5.0";
    }

    // Write updated package.json
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(chalk.green('✅ Kosal configuration added to package.json'));
    console.log(chalk.blue('📦 Installing shadcn dependency...'));

    // Install shadcn
    try {
      execSync('npm install', { stdio: 'inherit', cwd: process.cwd() });
      console.log(chalk.green('✅ Dependencies installed successfully'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not install dependencies automatically. Please run npm install manually.'));
    }

    console.log(chalk.green('\n🎉 Kosal initialization complete!'));
    console.log(chalk.blue('You can now add components using:'));
    console.log(chalk.white('  kosal add <component-name>'));
    
  } catch (error) {
    console.error(chalk.red('❌ Error during initialization:'), error);
    process.exit(1);
  }
}