const {casLogin} = require("./cas/casLogin")
const {sklLogin} = require("./skl/login")
const {sklSign} = require("./skl/sign")

module.exports = {
  casLogin,
  sklLogin,
  sklSign
}