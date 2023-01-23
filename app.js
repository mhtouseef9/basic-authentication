const express = require("express");
var mongoose = require('mongoose');
const dbConfig = require("./config/config");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// to access any file from this folder from URL like http://localhost:3000/uploads/abc.jpg
app.use('/uploads', express.static("uploads"));

const users = require("./routes/user.routes");
const posts = require("./routes/post.routes");

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(process.env.PORT, () => console.log('Server started'));


// DB config
dbConfig.dbConfig(mongoose);
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//     console.log("DB Connected");
// });
