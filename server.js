const inquirer = require("inquirer");
const mysql = require("mysql2");

//Connect to the SQL database 
const db = mysql.createConnection(
    {
      host: 'n4m3x5ti89xl6czh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'fe7q40acmt718yf0',
      password: 'bwk41hss7u9x2ri8',
      database: 'ip10x8bpza6sc7lc'
    },
    console.log(`Connected to the database.`)
  );