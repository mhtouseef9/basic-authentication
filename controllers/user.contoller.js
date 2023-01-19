const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.createUser = async (req, res) => {
    // pattern matching
     const { first_name, last_name, email, password } = req.body;
     const oldUser = await User.findOne({ email });
     if (oldUser) {
         return res.status(409).send("User Already Exist. Please Login");
     }

     var passwordHash = await bcrypt.hash(req.body.password, 10);
    req.body.passwordHash = passwordHash
    User.create(req.body)
        .then(user =>
            res.send(generatejwt(user))
        )
}
 exports.login = async (req, res) => {
     const { email, password } = req.body;
     const user = await  User.findOne({email});
     if (user && await bcrypt.compare(password, user.passwordHash)) {
         res.status(200).send(generatejwt(user));
     }
     else
     {
         res.status(400).send("Invalid Credentials");
     }
}

exports.getUsers = (req, res) => {
    User.find()
        .then(users =>
            res.send(users)
        )
}

generatejwt = (user) => {
    const {email} = user;
    const token = jwt.sign(
        { user_id: user._id, email },
        "test string",
        // process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    user.token = token;
    console.log(user);
    return user;
}
