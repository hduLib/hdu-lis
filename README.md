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

## Skl login


```js
const {sklLogin} = require("hdu-lis")

sklLogin(your_id, your_pw).then(res=>{
  console.log(res)
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

## Phy login

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

## Skl course

> just for this week

```js
const { sklCourses } = require("hdu-lis");

// true for all courses (have experiment), if you have changed the phy.hdu.edu.cn's password , you should add an argument phy_pw
sklCourses(your_id, your_pw,true).then((res) => {
  console.log(res);
})
```

## Skl today course

> just for today

```js
const { sklTodayCourses } = require("hdu-lis");

// true for all courses (have experiment), if you have changed the phy.hdu.edu.cn's password , you should add an argument phy_pw
sklTodayCourses(your_id, your_pw,true).then((res) => {
  console.log(res);
})
```

## Skl now course

> just for the rest of today

```js
const { sklNowCourses } = require("hdu-lis");

// true for all courses (have experiment), if you have changed the phy.hdu.edu.cn's password , you should add an argument phy_pw
sklNowCourses(your_id, your_pw,true).then((res) => {
  console.log(res);
})
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