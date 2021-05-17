/**
 * @description 获取用户设置的环境 fat/uat/pro
 * @return
 */
export function getUserSetEnv() {
  let defaultEnv = process.env.NODE_ENV === 'production' ? 'pro' : 'fat'
  const url = new URLSearchParams(location.search)
  const env = url.get('env') || sessionStorage.getItem('env')
  return env || defaultEnv
}

/**
 * @description 把通过url参数设置的环境保存到sessionStorage中
 */
export function saveUserSetEnv() {
  sessionStorage.setItem('env', getUserSetEnv())
}

/**
 * @description 设置页面title当前环境
 */
export function setTitleEnv() {
  document.title = `${document.title} - ${getUserSetEnv()}`
}
