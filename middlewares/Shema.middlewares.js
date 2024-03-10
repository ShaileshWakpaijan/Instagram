const ExpressError = require("../utils/ExpressError");
const { registerSchema,  loginSchema } = require("../utils/Schema")

const validateUser = (req, res, next) => {
    let { error } = registerSchema.validate(req.body);
    if (error) {
        next(new ExpressError(400, error.message));
    } else {
        next();
    }
}

const validateLogin = (req, res, next) => {
    let { error } = loginSchema.validate(req.body);
    if (error) {
        next(new ExpressError(400, error.message));
    } else {
        next();
    }
}



module.exports  = { validateUser, validateLogin }