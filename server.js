const express = require("express");
const env = require("dotenv");
env.config();
require("./config/db");
const signUp = require("./routes/signUp");
const loginRoute = require("./routes/login");

const bodyParser = require("body-parser");
const PORT = process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signUp);
app.use(loginRoute);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});