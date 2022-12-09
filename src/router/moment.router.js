const koaRouter = require("@koa/router");
const momentRouter = new koaRouter({ prefix: "/moment" });
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

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
//
/**
 * 添加标签
 * 1.是否登录
 * 2.验证是否有操作这个动态的权限
 * 3.验证label和name是否已存在与label表中
 * * 如果存在，直接使用即可
 * * 如果不存在，需要先将label和name添加到label表
 * 4.添加label和moment的关系到关系表中
 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
