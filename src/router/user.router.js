const koaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

// 创建路由对象
const userRouter = new koaRouter({ prefix: "/users" });

// 用户注册
userRouter.post("/", verifyUser, handlePassword, userController.create);

module.exports = userRouter;
