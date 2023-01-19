const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const users = require("./routes/user.routes");
const posts = require("./routes/post.routes");

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(3000, () => console.log('Server started'));


// DB config
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("DB Connected");
});