// const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");

const { UNAUTHORIZATION } = require("../config/error");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secret");

class LoginController {
  async sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      // 单位是秒
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: { id, name, token },
    };
  }

  test(ctx, next) {
    ctx.body = "身份验证通过!";
  }
}

module.exports = new LoginController();
