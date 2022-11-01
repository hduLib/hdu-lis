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

## Phy sign

> http://phy.hdu.edu.cn/

```js
const { phyLogin } = require("hdu-lis");

phyLogin(your_id, your_pw).then((res) => {
  console.log(res);
})
//return cookie
```

## Phy Expt

> get your experiments

```js
const { phyExpt } = require("hdu-lis");

phyExpt(your_id, your_pw).then((res) => {
  console.log(res);
})
//return expt list
```

# Thx

Thanks to the followings for their help.

- @BaiMeow
- @Camera-2018
- @AkaAny


# More

```
npm login
npm publish
```