const fs = require('fs')
const { exec, spawn } = require('child_process')

console.log('__dirname', __dirname)
console.log('process.cwd()', process.cwd())
console.log('process.env.PWD', process.env.PWD)
console.log('process.env.USER', process.env.USER)
console.log('process.env', process.env)
