let sql;
const sqlite3 = require("sqlite3").verbose();


//connect to DB

const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
});


//create table
sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,username,password)`;
db.run(sql,(err) => {
    if (err) {
    // Table already created);
    } else {
        sql = `INSERT INTO users(username,password) VALUES(?,?)`;
        db.run(sql,
             ["s821y9","shuyipassword1"],
             (err)=>{
             if (err) return console.error(err.message);
         });

    }
});


// drop table
db.run("DROP TABLE users");


// //inste data into table
sql = `INSERT INTO users(username,password) VALUES(?,?)`;
db.run(sql,
    ["s821y9","shuyipassword2"],
    (err)=>{
    if (err) return console.error(err.message);
});

// //update data
// // sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// // db.run(sql,['',1],(err)=>{
// //     if (err) return console.error(err.message);
// // });

// // //delete data
// // sql = `DELETE FROM users WHERE id = ?`;
// // db.run(sql,[1],(err)=>{
// //     if (err) return console.error(err.message);
// // });


// //query data
// sql = `SELECT * FROM users`;
// db.all(sql,[],(err,rows)=>{
//     if (err) return console.error(err.message); 
//     rows.forEach((row)=>{
//         console.log(row);
//     });
// });