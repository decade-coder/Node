const koaRouter = require("@koa/router");
const loginRouter = new koaRouter({ prefix: "/login" });
const { sign, test } = require("../controller/login.controller");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");

loginRouter.post("/", verifyLogin, sign);
loginRouter.get("/test", verifyAuth, test);

module.exports = loginRouter;
