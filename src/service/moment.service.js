const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment(content,user_id) VALUES(?,?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  async queryList(offset = 0, size = 10) {
    const statement = `
    SELECT 
      m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE moment_id = m.id) commentCount
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id
    LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }
  async queryById(id) {
    const statement = `
    SELECT 
      m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,(JSON_ARRAYAGG(
        JSON_OBJECT(
          'id',c.id,'content',c.content,'commentId',c.comment_id,'user',JSON_OBJECT('id',cu.id,'name',cu.name)
        ))
      ) commentList
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN comment c ON c.comment_id = m.id
    LEFT JOIN user cu ON cu.id = c.user_id
    WHERE m.id = ?
    GROUP BY m.id;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async update(id, content) {
    const state = "UPDATE moment SET content = ? WHERE id = ?;";
    const [result] = await connection.execute(state, [content, id]);
    return result;
  }
  async remove(id) {
    const statement = "DELETE FROM moment WHERE id = ?";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new MomentService();
