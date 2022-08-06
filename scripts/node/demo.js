/*
 * @Author: liaolongdong
 * @Date: 2022-08-04 21:42:33
 * @LastEditTime: 2022-08-04 21:54:35
 * @LastEditors: liaolongdong
 * @Description:
 * @FilePath: /webpack5-demo/scripts/node/demo.js
 */
const fs = require('fs')
const { exec, spawn } = require('child_process')

console.log('__dirname', __dirname)
console.log('process.cwd()', process.cwd())
console.log('process.env.PWD', process.env.PWD)
console.log('process.env.USER', process.env.USER)
console.log('process.env', process.env)
