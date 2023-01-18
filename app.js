const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const a = require("./routes/user.routes");

app.use("/api/users", a);

app.listen(3000, () => console.log('Server started'));