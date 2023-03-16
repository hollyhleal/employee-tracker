// Package to connect to your MySQL database and perform queries
const mysql = require("mysql2");
// Package to interact with the user via the command line
const inquirer = require("inquirer");
// Package to print MySQL rows to the console
const cTable = require("console.table");

// connect to server
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username
    user: "root",
    // MySQL password
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

function empTracker() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      let userChoice = res.action;
      switch (userChoice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        case "Quit":
          quitProgram();
          break;
      }
    });
}

// function for viewDepartments
const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.log("\n");
    console.table(results);
  });
  empTracker();
};

// function for viewRoles
const viewRoles = () => {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name as department FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.log("\n");
      console.table(results);
    }
  );
  empTracker();
};

// function for viewEmployees - TO DO: db.query select statement
const viewEmployees = () => {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, employee.manager_id as manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.log("\n");
      console.table(results);
    }
  );
  empTracker();
};

// function for addDepartment
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "newDept",
      },
    ])
    .then((input) => {
      db.query(
        "INSERT INTO department SET name = ?",
        input.newDept,
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("New department saved.");
          empTracker();
        }
      );
    });
};

// function for addRole
const addRole = () => {
  db.query("SELECT id as value, name FROM department", (err, results) => {
    err ? console.log(err) : console.log("\n");

    console.table(results);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role you would like to add?",
          name: "title",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department does the role belong to?",
          name: "department_id",
          choices: results,
        },
      ])
      .then(({ title, salary, department_id }) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`,
          (err, results) => {
            err ? console.log(err) : console.log("New role saved.");
            empTracker();
          }
        );
      });
  });
};

// TO DO: function for addEmployee
const addEmployee = () => {
  db.query("", (err, results) => {
    err ? console.log(err) : console.log("\n");

    console.table(results);

    inquirer.prompt([{}]);
  });
};

// TO DO: function for updateRole

// Quit function
const quitProgram = () => {
  process.exit();
};

empTracker();
