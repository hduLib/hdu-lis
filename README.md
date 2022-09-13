# hdu-lis
life is short, you need lis:)

# cas login

## 使用方法

```js
const {casLogin} = require("./casLogin")

const url ="https://cas.hdu.edu.cn/cas/login?state=5TdwtpuBVuwkLwYOR3r&service=https%3A%2F%2Fskl.hdu.edu.cn%2Fapi%2Fcas%2Flogin%3Fstate%3D5TdwtpuBVuwkLwYOR3r%26index%3D"

casLogin(url,your_id, your_pw).then(res =>{
  console.log(res.headers)
})
// 返回值为request请求信息，包含响应头
// 一般可根据响应头的重定向链接进行下一步操作
```

# skl sign

## 使用方法

```js
const { sklSign } = require("./sign.js");

sklSign(your_id, your_pw).then((res) => {
  console.log(res);
})
//返回值为200即打卡成功
```