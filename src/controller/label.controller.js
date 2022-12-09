const labelService = require("../service/label.service");
// const { UNAUTHORIZATION } = require("../config/error");
// const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.body = {
      code: 0,
      message: "创建标签成功！",
      data: result,
    };
  }
  async list(ctx, next) {
    ctx.body = {
      code: 0,
      message: "标签列表！",
      // data: result,
    };
  }
}

module.exports = new LabelController();
