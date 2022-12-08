const connection = require("../app/database");

class CommentService {
  async create(content, momentId, userId) {
    const statement =
      "INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result;
  }
  async reply(content, momentId, commentId, userId) {
    const statement =
      "INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES(?,?,?,?);";
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    return result;
  }
  // async queryList(offset = 0, size = 10) {
  //   const statement = `
  //   SELECT
  //     m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
  //   FROM moment m
  //   LEFT JOIN user u ON m.user_id = u.id
  //   LIMIT ? OFFSET ?;`;
  //   const [result] = await connection.execute(statement, [size, offset]);
  //   return result;
  // }
  // async queryById(id) {
  //   const statement = `
  //   SELECT
  //     m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
  //   FROM moment m
  //   LEFT JOIN user u ON m.user_id = u.id
  //   WHERE m.id = ?;`;
  //   const [result] = await connection.execute(statement, [id]);
  //   console.log("00000", result);
  //   return result;
  // }
  // async update(id, content) {
  //   const state = "UPDATE moment SET content = ? WHERE id = ?;";
  //   const [result] = await connection.execute(state, [content, id]);
  //   return result;
  // }
  // async remove(id) {
  //   const statement = "DELETE FROM moment WHERE id = ?";
  //   const [result] = await connection.execute(statement, [id]);
  //   return result;
  // }
}

module.exports = new CommentService();
