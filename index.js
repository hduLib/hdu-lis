const {casLogin} = require("./hdu/cas/casLogin")
const {sklLogin} = require("./skl/login")
const {sklSign} = require("./skl/sign")
const {phyLogin} = require("./hdu/phy/login")
const {phyExpt} = require("./hdu/phy/expt")
const {sklCourses,sklTodayCourses,sklNowCourses} = require("./skl/course")
const {sklPasscard,sklPunch} = require("./skl/passcard")

module.exports = {
  casLogin,
  sklLogin,
  sklSign,
  phyLogin,
  phyExpt,
  sklCourses,
  sklTodayCourses,
  sklNowCourses,
  sklPasscard,
  sklPunch
}
