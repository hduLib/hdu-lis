const { strEnc } = require("../utils/des.js");
const qs = require("qs");
const fetch = require('node-fetch');

async function casLogin(url, username, password) {
  try {
    const ul = username.length;
    const pl = password.length;
    const formDataHidden = await getFormData(url);
    const cookie = formDataHidden.cookie;
    const lt = formDataHidden.lt;
    const execution = formDataHidden.execution;
    const _eventId = formDataHidden._eventId;
    const rsa = strEnc(username + password + lt);
    const formData = {
      ul: ul,
      pl: pl,
      lt: lt,
      rsa: rsa,
      execution: execution,
      _eventId: _eventId,
    }
    const request = await fetch(url,{
      method: 'POST',
      body: qs.stringify(formData),//x-www-form-urlencoded
      credentials: 'include',//允许携带cookie
      redirect: 'manual', //禁止重定向
      headers: {
        'Host': 'cas.hdu.edu.cn',
        'Origin': 'https://cas.hdu.edu.cn',
        'Upgrade-Insecure-Requests': '1',
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        'Referer': url,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie':cookie
      }
    });

    return request
  } catch (err) {
    console.log(err)
    return err
  }
}

async function getFormData(url) {
  try {
    const request = await fetch(url);
    const data = await request.text();
    let reg = /<input type="hidden" name="(.*)" value="(.*)"/g;
    const formData = {};
    while (true) {
      const result = reg.exec(data);
      if (result === null) {
        break;
      }
      formData[result[1]] = result[2];
    }
    reg = /<input type="hidden" id="lt" name="(.*)" value="(.*)"/g;
    while (true) {
      const result = reg.exec(data);
      if (result === null) {
        break;
      }
      formData[result[1]] = result[2];
    }
    formData["cookie"] = request.headers.get('set-cookie');
    return formData
  }
  catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {

  casLogin,
  getFormData,
}