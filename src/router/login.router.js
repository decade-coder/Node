const koaRouter = require("@koa/router");

const loginRouter = new koaRouter({ prefix: "/login" });

loginRouter.post("/", (ctx, next) => {});

module.exports = loginRouter;
