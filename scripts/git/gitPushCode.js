/*
 * @Author: liaolongdong
 * @Date: 2022-02-25 11:43:26
 * @LastEditTime: 2022-02-25 16:15:16
 * @LastEditors: liaolongdong
 * @Description:
 * @FilePath: /webpack5-demo/scripts/git/gitPushCode.js
 */
// const exec = require('child_process').exec //异步子进程
const execSync = require('child_process').execSync //同步子进程
// const fs = require('fs') //文件读取模块

Date.prototype.format ||
  (Date.prototype.format = function (fmt) {
    const opt = {
      'Y+': this.getFullYear().toString(), // 年
      'm+': (this.getMonth() + 1).toString(), // 月
      'd+': this.getDate().toString(), // 日
      'H+': this.getHours().toString(), // 时
      'M+': this.getMinutes().toString(), // 分
      'S+': this.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      if (new RegExp('(' + k + ')', 'i').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? opt[k]
            : opt[k].padStart(RegExp.$1.length, '0'),
        )
      }
    }
    return fmt
  })

// 执行命令
function execCommand(cmd) {
  const res = execSync(cmd).toString().trim()
  console.log(`${cmd} --> ${res}`)
  return res
}

let cmdObj = {
  currentBranch: 'git rev-parse --abbrev-ref HEAD', // 获取当前分支名称
  name: 'git show -s --format=%cn', // 姓名
  email: 'git show -s --format=%ce', // 邮件
  date: 'git show -s --format=%cd', // 日期
  message: 'git show -s --format=%s', // 提交信息
  hash: 'git show -s --format=%H', // commit hash
}

// 获取提交信息
function getCommitInfo(cmdObj) {
  const commitInfo = {}
  for (let key in cmdObj) {
    // 日期格式化
    commitInfo[key] =
      key === 'date'
        ? new Date(execCommand(cmdObj[key])).format('yyyy-mm-dd hh:mm:ss')
        : execCommand(cmdObj[key])
  }
  console.log('commitInfo', commitInfo)
  return commitInfo
}
getCommitInfo(cmdObj)
