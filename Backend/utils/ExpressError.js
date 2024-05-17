class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.success = false
        this.statusCode = statusCode
        this.data = null
        this.message = message
    }
}

module.exports = ExpressError