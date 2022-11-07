const qs = require("qs");
const fetch = require('node-fetch');
const {ocr} = require("../../utils/ocr.js");

async function phyLogin(username, password='123456') {
    const CookieWithCaptcha = await getCookie();
    const url = "http://phy.hdu.edu.cn/login.jspx";
    const formData = {
      username: username,
      password: password,
      x: 1,
      y: 2,
      captcha: CookieWithCaptcha.captcha,
      returnUrl: '/',
    }
    const request = await fetch(url, {
      method: 'POST',
      body: qs.stringify(formData),//x-www-form-urlencoded
      credentials: 'include',//允许携带cookie but node-fetch does not support mode, cache or credentials options
      redirect: 'manual', //禁止重定向
      headers: {
        'Host': 'phy.hdu.edu.cn',
        'Origin': 'http://phy.hdu.edu.cn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        'Referer': 'http://phy.hdu.edu.cn/login.jspx?returnUrl=/',
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': CookieWithCaptcha.cookie
      }
    });
    const res = request.status;
    if(res===302){
      return CookieWithCaptcha.cookie
    }else{
      return request
    }
}


async function getCookie(){
    // get img
    const url = "http://phy.hdu.edu.cn/captcha.svl";
    const request = await fetch(url);
    const img = await request.buffer();
    // ocr
    const code = await ocr(img);
    // login
    const formData = {};
    formData["cookie"] = 'clientlanguage=zh_CN; '+request.headers.get('set-cookie');
    formData["captcha"] = code;
    return formData;
}

module.exports={
  phyLogin
}