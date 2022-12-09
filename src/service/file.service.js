const connection = require("../app/database");

class FileService {
  // 将图片信息和用户id结合起来存储
  async create(filename, mimetype, size, userId) {
    const statement =
      "INSERT INTO avatar (filename,mimetype,size,user_id) VALUE (?,?,?,?);";
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
}

module.exports = new FileService();
