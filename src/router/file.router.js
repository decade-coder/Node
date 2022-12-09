const koaRouter = require("@koa/router");
const fileRouter = new koaRouter({ prefix: "/file" });
const { verifyAuth } = require("../middleware/login.middleware");
// const { verifyPermission } = require("../middleware/permission.middleware");
const { create } = require("../controller/file.controller.js");
const { handleAvatar } = require("../middleware/file.middleware");

// 上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, create);

module.exports = fileRouter;
