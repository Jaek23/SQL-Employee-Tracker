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

  function generateTracker(){
    inquirer
        .prompt({
            type:"list",
            name:"tracker",
            message:"What would you like to do?",
            choices:[
                "View all departments",
                "View all roles",
                "View all employees",
                "add a department",
                "add a role",
                "add an employee",
                "Update an employee role",
                "Exit",
            ],
        })
        .then((answer) =>{
            switch(answer.tracker){
                case "View all departments":
                viewAllDepartments();
                break;
          
                case "View all roles":
                viewAllRoles();
                break;   
       
                case "View all employees":
                viewAllEmployees();
                break;  
          
                case "add a department":
                addADepartment();
                break; 
          
                case "add a role":
                addARole();
                break;    
     
                case "add an employee":
                addAnEmployee();
                break; 
          
                case "Update an employee role":
                updateAnEmployeeRole();
                break; 
         
                case "Exit":
                db.end();
                console.log('Goodbye!');
                break;
            }

        });
    }
generateTracker();

function viewAllDepartments(){
    const query = "SELECT * FROM department";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        generateTracker();
    });
}

function viewAllRoles(){
    const query = "SELECT * FROM roles";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        generateTracker();
    });
}

function viewAllEmployees(){
    const query = "SELECT * FROM employee";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        generateTracker();
    });
}

function addADepartment(){
    inquirer
        .prompt({
            type:"input",
            name:"departmentName",
            message:"Enter the name of the new department:",
        })
        .then((answer) =>{
            const query = `INSERT INTO department (department_name) VALUES ("${answer.departmentName}")`;
            db.query(query, (err, res) => {
                if (err) throw err;
                console.table("New department has been added to the database!");
                generateTracker();
            });
        })
}

// function addARole(){
//     const query = "SELECT * FROM department";
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         inquirer
//             .prompt([

//                 {
//                     type:"input",
//                     name: "title",
//                     messgae:"Enter the title of the new role:",
//                 },

//                 {
//                     type:"input",
//                     name: "salary",
//                     messgae:"Enter the salary of the new role:",
//                 },

//                 {
//                     type:"list",
//                     name: "department",
//                     messgae:"Select the department of the new role:",
//                     choices:res.map(
//                         (department) => department.department_name
//                     ),
//                 },
//             ])
            
//             .then((answers) =>{
//                 const department = res.find(
//                     (department) => department.name === answers.department
//                 ); 

//                 const query = "INSERT INTO roles SET ?";
//                 db.query(
//                     query,
//                     {
//                         title: answers.title,
//                         salary: answers.salary,
//                         department_id: department,
//                     },

//                     (err, res) => {
//                         if (err) throw err;
//                         console.table("New role has been added to the database!");
//                         generateTracker();
//                     });
//             })
//     });
// }