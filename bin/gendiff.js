#!/usr/bin/env node
import {Command} from 'commander';

const program = new Command();

program 
.name('gendiff')
.version ('1.0.0')
.helpOption ('-h, --help', 'output usage information')
.description ('Compares two configuration files and shows a difference.')
.usage('[options] <filepath1> <filepath2>');


program.parse();