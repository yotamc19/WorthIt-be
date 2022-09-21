const Ajv = require("ajv");
const ajv = new Ajv();

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      const err = new Error("Incorrect Schema");
      err.statusCode = 400;
      next(err);
      return;
    }
    next();
  };
}

module.exports = { validateBody };
