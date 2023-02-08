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

// just for graphhql

// import graphqlHTTP from 'express-graphql';
// import {makeExecutableSchema} from 'graphql-tools';
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
const User = require("./models/user");
const userController = require("./controllers/user.contoller");
const bcrypt = require("bcrypt");

// All GraphQL schemas and types of each context or module
var schema = buildSchema(`
    type Query {
        listUsers: [userType]
    },
    type Mutation {
        createUser(
        email: String
        firstName: String
        lastName: String
        password: String
        ): userType
    }
    type userType {
        _id: ID
        email: String
        firstName: String
        lastName: String
        token: String
    }
    type userInputType {
        email: String
        firstName: String
        lastName: String
        password: String
    }
`);

// resolver functions
var listUsers = async function(args) {
    let users = await User.find();
    return users;
}
var createUser = async function(args) {
    // pattern matching
    const { first_name, last_name, email, password } = args;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return {firstName: "User Already Exist. Please Login"};
    }
    var passwordHash = await bcrypt.hash(args.password, 10);
    args.passwordHash = passwordHash;
    let user = await User.create(args)
    let token = userController.generateJwt(user)
    return userController.userView(user, token);
}
// combining resolver functions and their relevant field of request.
var root = {
    listUsers: listUsers,
    createUser: createUser
};

// main route which will accept all graphql routes and forwards to relevant schema
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


