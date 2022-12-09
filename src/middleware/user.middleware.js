const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");
const { md5 } = require("../utils/md5");

// 对用户信息进行校验
const verifyUser = async (ctx, next) => {
  // 获取用户传递过来的信息
  const { name, password } = ctx.request.body;

  // 用户名、密码不能为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 判断name是否在数据库中已存在
  const users = await userService.findUserByName(name);

  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 执行下一个中间件
  await next();
};

// 对密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5(password);
  await next();
};
module.exports = { verifyUser, handlePassword };
