const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST } = require("../config/server");

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    await fileService.create(filename, mimetype, size, id);
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`;
    await userService.updateUserAvatar(avatarUrl, id);
    ctx.body = {
      code: 0,
      message: "头像上传成功!",
      data: avatarUrl,
    };
  }
}

module.exports = new FileController();
