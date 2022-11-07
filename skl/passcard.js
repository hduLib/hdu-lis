const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");
const fetch = require('node-fetch');

async function sklPasscard(username,password) {
    const token = await sklLogin(username,password);
    const url = "https://skl.hdu.edu.cn/api/passcard/my";
    const req = await fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'skl-ticket': getRandomString(21)
      }
    })
    let res = await req.json();
    
    return res
}

async function sklPunch(username,password) {
    const token = await sklLogin(username,password);
    const url = "https://skl.hdu.edu.cn/api/punch/my";
    const req = await fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'skl-ticket': getRandomString(21)
      }
    })
    let res = await req.json();
    
    return res.list[0]//仅获取最近的一次打卡记录
}


module.exports = {
  sklPasscard,
  sklPunch
}

