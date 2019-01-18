#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [选项]')
  .command('init', '根据模板创建项目')
  .command('list', '列出支持的模板')
  .command('upgrade', '更新模板')

program.parse(process.argv)
