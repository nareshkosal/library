import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    type: string;
    target?: string;
    content?: string;
  }>;
}

export async function addCommand(componentName: string, options: { registry?: string }) {
  const spinner = ora('Installing component...').start();

  try {
    // Get registry URL from options or kosal config
    const registryUrl = await getRegistryUrl(options.registry);
    
    await installComponent(componentName, registryUrl, spinner);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Check if it's a "not found" error
    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      spinner.fail(chalk.red(`❌ Component "${componentName}" not found in registry`));
      console.log(chalk.yellow('\n💡 Suggestions:'));
      console.log(chalk.white('  1. Make sure your registry is deployed and accessible'));
      console.log(chalk.white('  2. Try using your local server:'));
      console.log(chalk.blue(`     kosal add ${componentName} --registry http://localhost:3000`));
      console.log(chalk.white('  3. Check available components at:'));
      console.log(chalk.blue(`     ${await getRegistryUrl(options.registry)}/r/${componentName}.json`));
    } else {
      spinner.fail(chalk.red(`❌ Failed to install component: ${errorMessage}`));
    }
    process.exit(1);
  }
}

async function installComponent(componentName: string, registryUrl: string, spinner: any, isDependency = false) {
  // Fetch component data
  spinner.text = `Fetching ${componentName} component...`;
  const componentUrl = `${registryUrl}/r/${componentName}.json`;
  
  const response = await fetch(componentUrl);
  
  if (!response.ok) {
    console.error(`Failed to fetch ${componentUrl}: ${response.status} ${response.statusText}`);
    throw new Error(`Component "${componentName}" not found in registry`);
  }
  
  const componentData = await response.json() as RegistryItem;
  
  spinner.text = 'Installing dependencies...';
  
  // Install dependencies
  if (componentData.dependencies) {
    await installDependencies(componentData.dependencies);
  }
  
  // Install registry dependencies first (recursive)
  if (componentData.registryDependencies) {
    for (const dep of componentData.registryDependencies) {
      await installComponent(dep, registryUrl, spinner, true);
    }
  }
  
  spinner.text = 'Creating component files...';
  
  // Create component files
  await createComponentFiles(componentData.files, registryUrl);
  
  if (!isDependency) {
    spinner.succeed(chalk.green(`✅ Component "${componentName}" installed successfully!`));
    
    console.log(chalk.blue('\n📋 Installation Summary:'));
    console.log(chalk.white(`  • Component: ${componentData.title}`));
    console.log(chalk.white(`  • Description: ${componentData.description}`));
    
    if (componentData.dependencies?.length) {
      console.log(chalk.white(`  • Dependencies: ${componentData.dependencies.join(', ')}`));
    }
    
    if (componentData.registryDependencies?.length) {
      console.log(chalk.white(`  • Registry Dependencies: ${componentData.registryDependencies.join(', ')}`));
    }
    
    console.log(chalk.green('\n🎉 Installation complete!'));
  }
}

async function getRegistryUrl(customUrl?: string): Promise<string> {
  if (customUrl) {
    return customUrl;
  }
  
  // Check for kosal config in package.json
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    
    if (packageJson.kosal?.registry) {
      return packageJson.kosal.registry;
    }
  } catch (error) {
    // Fallback to default
  }
  
  return 'https://library-five-lovat.vercel.app';
}

async function installDependencies(dependencies: string[]) {
  if (!dependencies.length) return;
  
  try {
    const depsString = dependencies.join(' ');
    execSync(`npm install ${depsString}`, { stdio: 'inherit', cwd: process.cwd() });
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not install some dependencies automatically'));
  }
}



async function createComponentFiles(files: any[], registryUrl: string) {
  for (const file of files) {
    const targetPath = file.target || getDefaultTargetPath(file.path);
    
    try {
      let content: string;
      
      // Use inline content if available, otherwise fetch from URL
      if (file.content) {
        content = file.content;
      } else {
        // Fallback to fetching from URL (for backward compatibility)
        const fileUrl = `${registryUrl}/${file.path}`;
        const response = await fetch(fileUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }
        
        content = await response.text();
        
        // Check if we got HTML instead of the expected content
        if (content.includes('<!DOCTYPE html>') || content.includes('<html')) {
          throw new Error(`Received HTML content instead of file content for ${file.path}. This usually means the file doesn't exist at the expected URL.`);
        }
      }
      
      // Fix import paths to use @/ alias
      content = content.replace(/from ['"]@\//g, "from '@/");
      content = content.replace(/import\s+.*\s+from\s+['"]\.\.\/\.\.\/lib\/utils['"]/g, "import { cn } from '@/lib/utils'");
      content = content.replace(/import\s+.*\s+from\s+['"]\.\.\/ui\//g, "import { $1 } from '@/components/ui/");
      
      // Ensure directory exists
      await fs.ensureDir(path.dirname(targetPath));
      
      // Write file
      await fs.writeFile(targetPath, content);
      
      console.log(chalk.gray(`  Created: ${targetPath}`));
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Could not create file: ${targetPath}`));
      console.warn(chalk.yellow(`   Error: ${error instanceof Error ? error.message : String(error)}`));
    }
  }
}

function getDefaultTargetPath(filePath: string): string {
  // Convert registry path to local path
  // registry/new-york/blocks/hello-world/hello-world.tsx -> components/hello-world.tsx
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1];
  
  if (filePath.includes('/ui/')) {
    return `components/ui/${fileName}`;
  } else if (filePath.includes('/blocks/')) {
    const blockName = parts[parts.indexOf('blocks') + 1];
    return `components/${blockName}/${fileName}`;
  } else if (filePath.includes('/hooks/')) {
    return `hooks/${fileName}`;
  } else if (filePath.includes('/lib/')) {
    return `lib/${fileName}`;
  } else {
    return `components/${fileName}`;
  }
}