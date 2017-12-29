#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('0.0.1')
    .description('San(MVVM framework)应用模板工程的cli')
program
    .command('* init <project> <tpl>')
    .action(function(tpl, project) {
        log.info('目前san-cli支持amd和webpack两种模板，示例：san init myproject --amd | --webpack')
        if (tpl && project) {
            let pwd = shell.pwd()
            let url;
            if(tpl == '--amd'){
                url = `https://github.com/woodstream/san-mui-with-amd.git`;
            }else{
                url = `https://github.com/woodstream/san-mui-with-webpack.git`;
            }
            log.info(`正在${url}拉取模板代码 ...`)
            clone(url, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('正确命令例子：san-cli init myproject --amd')
        }
    })
program.parse(process.argv)