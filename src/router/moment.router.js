const koaRouter = require("@koa/router");
const momentRouter = new koaRouter({ prefix: "/moment" });
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

// 创建动态
momentRouter.post("/", verifyAuth, create);
// 获取动态列表
momentRouter.get("/", list);
// 查看动态详情
momentRouter.get("/:momentId", detail);
// 修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
