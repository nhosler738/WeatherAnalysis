
// mysql database driver 
var mysql = require('../libs/mysql2');




var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TheNelkBoy2524!",
    database: "Weather"
});

connection.connect((err, connection) => {
    if (err) {
        console.log("Error connecting to database");
        return;
    }
    console.log('Connected to Host');


});

// script import variables
module.exports = {connection, mysql};









