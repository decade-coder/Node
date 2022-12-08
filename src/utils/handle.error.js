const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  OPERATE_IS_NOT_ALLOWED,
} = require("../config/error");

// TODO: 无法检测到error事件
app.on("error", (error, ctx) => {
  console.log("app on:error");
  let code = 0;
  let message = "";
  console.log("-------:", error, ctx);
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "用户名或者密码不能为空！";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已存在！";
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      message = "登录的用户名不存在，请检查用户名！";
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004;
      message = "密码错误，请检查密码！";
      break;
    case UNAUTHORIZATION:
      code = -1005;
      message = "无效token或token已过期！";
      break;
    case OPERATE_IS_NOT_ALLOWED:
      code = -2001;
      message = "没有修改该资源的权限！";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
