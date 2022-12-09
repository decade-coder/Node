const labelService = require("../service/label.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const newLables = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      labelObj.id = result.id;
    } else {
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId;
    }
    newLables.push(labelObj);
  }
  ctx.labels = newLables;
  await next();
};

module.exports = { verifyLabelExists };
