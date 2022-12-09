const koaRouter = require("@koa/router");
const { create, showAvatarImage } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

// 创建路由对象
const userRouter = new koaRouter({ prefix: "/user" });

// 用户注册
userRouter.post("/", verifyUser, handlePassword, create);

// 查看用户头像
userRouter.get("/avatar/:userId", showAvatarImage);

module.exports = userRouter;
