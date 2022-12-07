const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
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
      console.log("111111");
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已存在！";
      console.log("2222222");
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
