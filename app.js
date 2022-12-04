let sql;
const sqlite3 = require("sqlite3").verbose();


//connect to DB

const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
});


//create table
sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name,last_name,username,password,email)`;
db.run(sql,(err) => {
    if (err) {
        // Table already created);
    } else {
        sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES(?,?,?,?,?)`;
        db.run(sql,
             ["Shuyi","Chen","s821y9","shuyipassword","shuyiemail@gmail.com"],
             (err)=>{
             if (err) return console.error(err.message);
         });

    }
});


// //drop table
// db.run("DROP TABLE users");


//inste data into table
// sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES(?,?,?,?,?)`;
// db.run(sql,
//     ["Shuyi","Chen","s821y9","shuyipassword","shuyiemail@gmail.com"],
//     (err)=>{
//     if (err) return console.error(err.message);
// });

//update data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql,['',1],(err)=>{
//     if (err) return console.error(err.message);
// });

// //delete data
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql,[1],(err)=>{
//     if (err) return console.error(err.message);
// });


// //query data
// sql = `SELECT * FROM users`;
// db.all(sql,[],(err,rows)=>{
//     if (err) return console.error(err.message); 
//     rows.forEach((row)=>{
//         console.log(row);
//     });
// });