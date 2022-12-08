const koaRouter = require("@koa/router");
const commentRouter = new koaRouter({ prefix: "/comment" });
const { create, reply } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
// const { verifyPermission } = require("../middleware/permission.middleware");

// 新增评论
commentRouter.post("/", verifyAuth, create);
// 回复评论
commentRouter.post("/reply", verifyAuth, reply);
// 获取评论
// 修改动态
// 删除评论

module.exports = commentRouter;
