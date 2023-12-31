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
    const query ="SELECT roles.title, roles.id, department.department_name, roles.salary from roles join department on roles.department_id = department.id";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        generateTracker();
    });
}

function viewAllEmployees(){
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id ';
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

function addARole(){
    const query = "SELECT * FROM department";
    db.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([

                {
                    type:"input",
                    name: "title",
                    message:"Enter the title of the new role:",
                },

                {
                    type:"input",
                    name: "salary",
                    messagee:"Enter the salary of the new role:",
                },

                {
                    type:"list",
                    name: "department",
                    message:"Select the department of the new role:",
                    choices:res.map(
                        (department) => ({name:department.department_name,value:department.id})
                    ),
                },
            ])
            
            .then((answers) =>{ 
                const department = answers.department 
                const query = "INSERT INTO roles SET ?";
                db.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department,
                    },

                    (err, res) => {
                        if (err) throw err;
                        console.table("New role has been added to the database!");
                        generateTracker();
                    });
            })
    });
}

function addAnEmployee() {
    const query = "SELECT id, title FROM roles";
    db.query(query,(error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select the employee role:",
                            choices: roles,
                        },
                    ])
                    .then((answers) => {
                        
                        const sql =
                            "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                        ];
                        db.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }

                            console.log("Employee added successfully");
                            generateTracker();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    };
