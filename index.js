const express = require("express");
const app = express();
const PORT = process.env.PORT || 8787;
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");
app.use(express.json());
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

dbConnection();
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
//app.use(typeError);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))
app.listen(PORT, console.log(`Server started on port ${PORT}`));
module.exports = app;
