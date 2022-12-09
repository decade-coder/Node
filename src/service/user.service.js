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
  async queryAvatarByUserId(userId) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?;";
    // 数据库获取的结果中可能有多张图片，获取最新的，也就是数组中最后一个元素
    const [values] = await connection.execute(statement, [userId]);
    return values.pop();
  }
  // 将头像的地址信息，保存到user表中
  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE user SET avatar_url = ? WHERE id = ?;";
    const [values] = await connection.execute(statement, [avatarUrl, userId]);
    return values;
  }
}

module.exports = new UserService();
