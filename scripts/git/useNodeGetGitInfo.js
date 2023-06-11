// 参考链接地址：https://blog.csdn.net/wang1006008051/article/details/103699669
/** 定义模块和变量**/
// const exec = require('child_process').exec //异步子进程
const execSync = require('child_process').execSync // 同步子进程
const fs = require('fs') // 文件读取模块
const gitInfoPath = 'gitInfo.json' // gitInfo路径
const buildPath = 'dist' // 打包的路径
const autoPush = false // 写入版本信息之后是否自动提交git上
const commitId = execSync('git show -s --format=%H').toString().trim() // 当前提交的版本号

// 不借用chalk库，原生Node打印颜色
// console.log('\x1b[32m%s\x1b[0m', '这是绿色文本') // 绿色
// console.log('\x1b[33m%s\x1b[0m', '这是黄色文本') // 黄色
// console.log('\x1b[31m%s\x1b[0m', '这是红色文本') // 红色

/** 程序开始**/
let gitInfoObj = {} // 保存git版本信息

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

// 如果gitInfoPath存在，将先读取里边的版本信息
if (fs.existsSync(gitInfoPath)) {
  gitInfoObj = JSON.parse(fs.readFileSync(gitInfoPath).toString())
}

// 判断当前版本是否已经存在，存在则不再次生成
if (gitInfoObj.commitId === commitId) {
  console.warn('\x1B[33m%s\x1b[0m', 'warning: 当前的git版本数据已经存在了!\n')
} else {
  let currentGitBranch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim() // 当前git分支
  let name = execSync('git show -s --format=%cn').toString().trim() // 姓名
  let email = execSync('git show -s --format=%ce').toString().trim() // 邮箱
  let date = new Date(execSync('git show -s --format=%cd').toString()) // 日期
  let message = execSync('git show -s --format=%s').toString().trim() // 说明

  gitInfoObj = {
    currentGitBranch,
    name,
    email,
    date: date.format('yyyy-mm-dd hh:mm:ss'),
    commitId,
    message,
  }
  const saveInfoStr = JSON.stringify(gitInfoObj, null, 2)
  fs.writeFileSync(gitInfoPath, saveInfoStr)
  // 写入版本信息之后，自动将版本信息提交到当前分支的git上
  if (autoPush) {
    execSync(`git add .`)
    execSync(`git commit ${gitInfoPath} -m 自动提交版本信息`)
    execSync(
      `git pull origin ${execSync('git rev-parse --abbrev-ref HEAD')
        .toString()
        .trim()}`,
    )
    execSync(
      `git push origin ${execSync('git rev-parse --abbrev-ref HEAD')
        .toString()
        .trim()}`,
    )
  }

  // 程序执行结束
  console.log(
    '\x1b[32m%s\x1b[0m',
    `execute success: file address is ${process.cwd()}/${gitInfoPath}\n`,
  )
}

// 将gitInfo文件移植到打包文件中
if (fs.existsSync(buildPath)) {
  fs.writeFileSync(`${buildPath}/${gitInfoPath}`, fs.readFileSync(gitInfoPath))
}
