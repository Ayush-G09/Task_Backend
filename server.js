const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

env.config();
require("./config/db");
const signUp = require("./routes/signUp");
const loginRoute = require("./routes/login");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.SERVER_PORT;


app.use(signUp);
app.use(loginRoute);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
