const {casLogin} = require("../hdu/cas/casLogin");
const fetch = require('node-fetch');


async function getCasLoginUrl(){
  let api = await fetch("https://skl.hdu.edu.cn/api/userinfo?type=&index=passcard.html")
  const url = (await api.json()).url
  return url
}

// 返回已登陆的token
async function sklLogin(username,password){
  const url = await getCasLoginUrl()
  const cas = await casLogin(url,username,password)
  const cookie = cas.headers.get("set-cookie")
  const location = cas.headers.get("location")
  const res = await fetch(location,{
    method: 'GET',
    credentials: 'include',//允许携带cookie
    redirect: 'manual', //禁止重定向
    headers: {
      'Host': 'skl.hdu.edu.cn',
      'Upgrade-Insecure-Requests': '1',
      'Accept-Encoding': 'gzip, deflate',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
      'Referer': 'https://cas.hdu.edu.cn/',
      'Cookie':cookie,
    }
  })
  return res.headers.get("x-auth-token")
}

module.exports = {
  sklLogin
}