// Use CommonJS require below so we can dynamically import during build-time.
console.log("test:", process.env.REACT_APP_ENVIRONMENT);
if (process.env.REACT_APP_ENVIRONMENT === "production") {
    module.exports = require("./configureStore.prod");
} else {
    module.exports = require("./configureStore.dev");
}