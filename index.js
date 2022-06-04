const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8787;
const { typeError } = require("./middlewares/errors");
const { dbConnection } = require("./config/config");
app.use(express.json());

dbConnection();
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use(typeError);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
