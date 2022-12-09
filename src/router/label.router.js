const koaRouter = require("@koa/router");
const labelRouter = new koaRouter({ prefix: "/label" });

const { verifyAuth } = require("../middleware/login.middleware");
const { create, list } = require("../controller/label.controller");

// 新增标签
labelRouter.post("/", verifyAuth, create);
// 获取标签
labelRouter.get("/", list);

// 修改动态
// 删除评论

module.exports = labelRouter;
