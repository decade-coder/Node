const Koa = require("koa");
const koaRouter = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const { SERVER_PORT } = require("./config/server");
const app = new Koa();

const userRouter = new koaRouter({ prefix: "/users" });
app.use(userRouter.routes());

app.use((ctx, next) => {
  ctx.body = "hello hub!";
});

userRouter.get("/list", (ctx, next) => {
  ctx.body = "users list";
});

app.listen(SERVER_PORT, () => {
  console.log("hub服务器已启动...");
});
