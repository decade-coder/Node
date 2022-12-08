const permissionService = require("../service/permission.service");
const { OPERATE_IS_NOT_ALLOWED } = require("../config/error");

const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");
  const isPermission = await permissionService.checkResource(
    resourceName,
    resourceId,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATE_IS_NOT_ALLOWED, ctx);
  }
  // 有权限修改的话执行下一个中间件
  await next();
};

module.exports = { verifyPermission };
