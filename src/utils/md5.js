const crypto = require("crypto");

function md5(value) {
  const md5 = crypto.createHash("md5");
  // digest('hex'):转成十六进制
  const result = md5.update(value).digest("hex");
  return result;
}

module.exports = {
  md5,
};
