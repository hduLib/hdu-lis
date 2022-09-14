# HduLis
life is short, you need lis:)

# Usage

## Installation

```bash
  npm i hdu-lis
```

## Cas login


```js
const {casLogin} = require("hdu-lis")

const url ="https://cas.hdu.edu.cn/cas/login?********************"

casLogin(url,your_id, your_pw).then(res =>{
  console.log(res.headers)
})
```

## Skl sign


```js
const { sklSign } = require("hdu-lis");

sklSign(your_id, your_pw).then((res) => {
  console.log(res);
})
//return 200
```


# Thx

Thanks to the followings for their help.

- @BaiMeow
- @Camera-2018
- @AkaAny
