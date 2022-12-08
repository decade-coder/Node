// const jwt = require("jsonwebtoken");
const momentService = require("../service/moment.service");
// const { UNAUTHORIZATION } = require("../config/error");
// const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");

class momentController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    // 获取发布动态的用户id
    const { id } = ctx.user;
    console.log(id, content);
    // 将动态相关数据保存到数据库中
    const result = await momentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "创建动态成功！",
      data: result,
    };
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.queryById(momentId);
    ctx.body = {
      code: 0,
      data: result[0],
    };
  }
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改成功",
      data: result,
    };
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    console.log(1111, momentId);
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: result,
    };
  }
}

module.exports = new momentController();
