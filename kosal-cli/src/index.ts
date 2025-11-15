#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('kosal')
  .description('Custom CLI for installing components from kosal registry')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize your project with kosal configuration')
  .action(initCommand);

program
  .command('add <component>')
  .description('Add a component from the kosal registry')
  .option('-r, --registry <url>', 'Custom registry URL', 'https://library-five-lovat.vercel.app')
  .action(addCommand);

program.parse();