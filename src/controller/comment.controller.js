// const jwt = require("jsonwebtoken");
const commentService = require("../service/comment.service");
// const { UNAUTHORIZATION } = require("../config/error");
// const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");

class commentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    console.log(111, content, momentId, id);
    const result = await commentService.create(content, momentId, id);
    ctx.body = {
      code: 0,
      message: "评论成功！",
      data: result,
    };
  }
  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;
    // console.log(111, content, momentId, id);
    const result = await commentService.reply(content, momentId, commentId, id);
    ctx.body = {
      code: 0,
      message: "回复评论成功！",
      data: result,
    };
  }

  // async list(ctx, next) {
  //   const { offset, size } = ctx.query;
  //   const result = await momentService.queryList(offset, size);
  //   ctx.body = {
  //     code: 0,
  //     data: result,
  //   };
  // }
  // async detail(ctx, next) {
  //   const { momentId } = ctx.params;
  //   const result = await momentService.queryById(momentId);
  //   ctx.body = {
  //     code: 0,
  //     data: result[0],
  //   };
  // }
  // async update(ctx, next) {
  //   const { momentId } = ctx.params;
  //   const { content } = ctx.request.body;
  //   const result = await momentService.update(momentId, content);
  //   ctx.body = {
  //     code: 0,
  //     message: "修改成功",
  //     data: result,
  //   };
  // }
  // async remove(ctx, next) {
  //   const { momentId } = ctx.params;
  //   console.log(1111, momentId);
  //   const result = await momentService.remove(momentId);
  //   ctx.body = {
  //     code: 0,
  //     message: "删除成功",
  //     data: result,
  //   };
  // }
}

module.exports = new commentController();
