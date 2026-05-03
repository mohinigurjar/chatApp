const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // 5 attempts per IP
    message: {
        error: "Too many login attempts. Try again later."
    }
})

const messageLimiter = rateLimit({
    windowMs: 10*1000, //1 sec
    max: 15, //5 msgs
    keyGenerator: (req) => req.user.id,
    message: "You are sending messages too fast"
})

module.exports = { loginLimiter, messageLimiter };