const connection = require("../app/database");

class UserService {
  async create(user) {
    // 获取用户
    const { name, password } = user;
    // 拼接statement
    const statememt = "INSERT INTO `user` (name,password) VALUES(?,?);";
    // 执行sql语句
    const result = connection.execute(statememt, [name, password]);
    return result;
  }
  async findUserByName(name) {
    const statement = "SELECT * FROM `user` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

module.exports = new UserService();
