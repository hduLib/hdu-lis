const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");
const fetch = require('node-fetch');

const payload = {
	"currentLocation": "浙江省杭州市钱塘区",
	"healthCode": 0,
	"city": "杭州市",
	"districtAdcode": "330114",
	"province": "浙江省",
	"district": "钱塘区",
	"healthReport": 0,
	"currentLiving": 0,
	"last14days": 0
}

async function sklSign(username,password) {
  const token = await sklLogin(username,password)
  const res = await fetch("https://skl.hdu.edu.cn/api/punch",{
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
      'skl-ticket': getRandomString(21)
    }
  })
  return res.status
}


module.exports = {
  sklSign
}