
function getChineseDate() {
    return new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
    );
}

module.exports = getChineseDate;