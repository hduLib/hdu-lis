# hdu-lis
life is short, you need lis:)

# cas login

## 使用方法

```js
const {casLogin} = require("./casLogin.js")

const url ="https://cas.hdu.edu.cn/cas/login?********************"

casLogin(url,your_id, your_pw).then(res =>{
  console.log(res.headers)
})
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


## 感谢

本项目得到了很多大佬的帮助，在此一并列出并感谢

- @BaiMeow
- @Camera-2018
- @AkaAny
