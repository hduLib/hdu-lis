const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");

const payload = {
	CurrentLocation: "浙江省杭州市钱塘区",
	City:            "杭州市",
	DistrictAdcode:  "330114",
	Province:        "浙江省",
	District:        "钱塘区",
	HealthCode:      0,
	HealthReport:    0,
	CurrentLiving:   0,
	Last14Days:      0,
}

async function sklSign(username,password) {
  const token = await sklLogin(username,password)
  const res = await fetch("https://skl.hdu.edu.cn/api/punch",{
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
      'skl-ticket': getRandomString(21)
    }
  })
  return res
}


module.exports = {
  sklSign
}