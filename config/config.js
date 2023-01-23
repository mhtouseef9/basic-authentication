const dbConfig = () => {
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("DB Connected");
    });
};

const someOtherConfig = () => {

}

module.exports = [
    dbConfig(),
    someOtherConfig()
];
