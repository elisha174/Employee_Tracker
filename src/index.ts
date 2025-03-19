// importing classes from other files
import inquirer from "inquirer";
import { QueryResult } from "pg";
import { pool } from "./connection.js";

const viewAllEmployees = function () {
  pool.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, r.department, r.salary, e.manager_id AS manager from employees e JOIN ( SELECT r.id, r.title, d.name AS department, r.salary from roles r INNER JOIN departments d ON r.department = d.id) r ON e.role_id = r.id",
    (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.table(result.rows);
        console.log("\n\n\n\n\n\n\n\n\n\n");
      }
    }
  );

  //Go back to start Employee Manager Menu
  // startEmployeeManager();
};

// Query database to retrieve all the roles

const roleChoices = async () => {
    let roles: string[] = [];

    let allRoles = await pool.query("SELECT title FROM roles")

    if (allRoles) {
      let allEmployeesTitles = allRoles.rows;
      allEmployeesTitles.map(employee => {
        roles.push(employee.title);
    })
    } else {
      console.log("An error occurred");
    }

  return roles;
};



// method to start the Employee Manager
const addEmployee = async function () {
  let allRoleChoices = await roleChoices();
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the employee's first name?`,
        name: "firstName"
      },
      {
        type: "input",
        message: `What is the employee's last name?`,
        name: "lastName"
      },
      {
        type: "list",
        name: "role",
        message: `What is the employee's role?`,
        choices: allRoleChoices
      }
    ])
    .then(async (answers) => {

      const roleId = await pool.query(`SELECT id FROM roles where title = '${answers.role}'`)

      // Adding a new Employee to the database using an insert statement
      const newEmployee = await pool.query(`INSERT INTO employees (first_name, last_name, role_id) 
            VALUES ('${answers.firstName}', '${answers.lastName}', '${roleId.rows[0].id}')`);

      console.log(`Added ${newEmployee} was added to the database.`);
      startEmployeeManager();
    });

    

    //Go back to start Employee Manager Menu
    //  startEmployeeManager();
};

// Query database to retrieve all the departments
const employeeChoices = async () => {
    let employees; 
    pool.query(
      "SELECT first_name, last_name FROM employees",
      (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);
          employees = result.rows;
        }
      }
    );
    return employees;
  };


// method to Update Employee Role
const updateEmpRole = async function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Which employee's role do you want to update?`,
        choices: await employeeChoices(),
      },
      {
        type: "list",
        name: "role",
        message: `Which role do you want to assign the selected employee?`,
        choices: await roleChoices(),
      },
    ])
    .then((answers) => {
      // Adding a new Employee to the database using an insert statement

      const role = pool.query(
        `SELECT id FROM roles where title = ${answers.role}`,
        (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
        }
      );

      pool.query(
        `INSERT INTO employees (first_name, last_name, role_id) 
            VALUES (${answers.employee.firstName}, ${answers.employee.lastName}, ${role})`,
        (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
        }
      );
    });

    console.log(`Updated employee's role`)

     //Go back to start Employee Manager Menu
    //  startEmployeeManager();
};

// method to View All Roles
const viewRoles = function () {
  // Using a Select statement to view all roles

  pool.query(
    `SELECT r.id, r.title, d.name AS department, r.salary from roles r INNER JOIN departments d ON r.department = d.id`,
    (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.table(result.rows);
        console.log("\n\n\n\n\n\n\n\n\n\n");
      }
    }
  );

  //Go back to start Employee Manager Menu
  // startEmployeeManager();
};

// Query database to retrieve all the departments
const departmentChoices = async function () {
    let departments;
    pool.query(
      "SELECT name FROM departments",
      (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);
          departments = result.rows;
        }
      }
    );
    return departments;
  };

// method to Add Role
const addRole = async function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the name of the role?`,
        name: "role",
      },
      {
        type: "input",
        message: `What is the salary of the role?`,
        name: "salary",
      },
      {
        type: "list",
        name: "department",
        message: `Which department does the role belong to?`,
        choices: await departmentChoices(),
      },
    ])
    .then((answers) => {
      // Adding a new Role to the database using an insert statement

      const department = pool.query(
        `SELECT id FROM departments where name = '${answers.department}'`,
        (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
        }
      );
      
      pool.query(
        `INSERT INTO roles (title, salary, department) 
            VALUES (${answers.role}, ${answers.salary}, ${department})`,
        (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
        }
      );

      console.log(`Added ${answers.role} to the database.`);
    });



    //Go back to start Employee Manager Menu
    // startEmployeeManager();
};

// method to View All Departments
const viewAllDepartments = function () {
    pool.query('SELECT * FROM departments',
         (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.table(result.rows);
          console.log("\n\n\n\n\n\n\n\n\n\n");
        }
      });

    //Go back to start Employee Manager Menu
    // startEmployeeManager();
};

// method to Add Department
const addDepartment = function () {
  inquirer
    .prompt([
      {
        type: "input",
        message: `What is the name of the department?`,
        name: "department",
      },
    ])
    .then((answers) => {
      // Adding a new department to the database using an insert statement

      pool.query(
        `INSERT INTO departments (name) 
            VALUES (${answers.department})`,
        (err: Error, result: QueryResult) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log(result.rows);
          }
        }
      );

      console.log(`Added ${answers.department}`);
    });

    

    //Go back to start Employee Manager Menu
    // startEmployeeManager();
};

// method to start the Employee Manager
const startEmployeeManager = function () {

  inquirer
    .prompt([
      {
        type: "list",
        name: "CreateOrSelect",
        message: "What would you like to do?",
        choices: [
          `View all Employees`,
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      // check if the user wants to create a new vehicle or select an existing vehicle
      switch (answers.CreateOrSelect) {
        case "View all Employees":
          //console.log(`something`);
            viewAllEmployees();
            console.log("");
            startEmployeeManager();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmpRole();
            break;
        case "View All Roles":
            viewRoles();
            console.log("");
            startEmployeeManager();
            break;
        case "Add Role":
            addRole();
            break;
        case "View All Departments":
            viewAllDepartments();
            console.log("");
            startEmployeeManager();
            break;
        case "Add Department":
            addDepartment();
            break;
        default:
            process.exit(0);
            break;
      }
      
    });
};

// export the Cli class
export { startEmployeeManager };
