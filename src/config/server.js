const dotenv = require("dotenv");
// 该行代码会为process.env添加.env文件中的变量
dotenv.config();

module.exports = { SERVER_PORT } = process.env;
