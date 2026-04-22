const validate = (schema) => (req, res, next) => {
    console.log("middleware hit");
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
        errors: result.error.issues.map(e => ({
            field: e.path[0],
            message: e.message
        }))
        });
    }

    req.body = result.data;
    console.log(req.body);
    next();
}

module.exports = validate;