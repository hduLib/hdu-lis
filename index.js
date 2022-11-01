const {casLogin} = require("./hdu/cas/casLogin")
const {sklLogin} = require("./skl/login")
const {sklSign} = require("./skl/sign")
const {phyLogin} = require("./hdu/phy/login")
const {phyExpt} = require("./hdu/phy/expt")

module.exports = {
  casLogin,
  sklLogin,
  sklSign,
  phyLogin,
  phyExpt
}
