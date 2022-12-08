const jwt = require("jsonwebtoken");

const { md5 } = require("../utils/md5");
const userService = require("../service/user.service");
const { PUBLIC_KEY } = require("../config/secret");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
} = require("../config/error");

// 对用户信息进行校验
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 查询该用户是否在数据库中存在
  const [user] = await userService.findUserByName(name);

  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 查询数据中密码和用户传递的密码是否一致
  if (user.password !== md5(password)) {
    ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
  }
  // 将user对象保存在ctx中，以备下个中间件使用
  ctx.user = user;

  // 执行下一个中间件
  await next();
};

// 验证token
const verifyAuth = async (ctx, next) => {
  const { authorization } = ctx.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 将登录的用户信息存储在ctx中
    ctx.user = result;
    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
