#!/usr/bin/env node

const program = require('commander')

program
  .version(require('./package').version)
  .usage('<command> [options]');

program
	.command('create')
	.description('create a new project')
	.alias('c')
	.action(() => {
			require('./command/create')()
	})


program
	.command('init')
	.description('pull a new project')
	.alias('i')
	.action(() => {
			require('./command/init')()
	})

program
	.command('list')
	.description('list templates')
	.alias('l')
	.action(() => {
			require('./command/list')()
	})

program
	.command('upgrade')
	.description('upgrade template')
	.alias('u')
	.action(() => {
			require('./command/upgrade')()
	})

program.parse(process.argv)

// 处理参数和提供帮助信息
if(!program.args.length){
	program.help()
}
