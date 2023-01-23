const express = require("express");

const app = express();

const config = require("./config/config");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// to access any file from this folder from URL like http://localhost:3000/uploads/abc.jpg
app.use('/uploads', express.static("uploads"));

//importing all routes here
const users = require("./routes/user.routes");
const posts = require("./routes/post.routes");

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(process.env.PORT, () => console.log('Server started'));


// importing all config
config;
