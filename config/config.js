const dbConfig = () => {
    let mongoose = require('mongoose');
    let url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000';
    mongoose.connect(url, {dbName: "authDev"});
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
