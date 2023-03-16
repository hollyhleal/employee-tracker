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

      // console.table(department);
      // .catch((err) => {
      //   console.log(err);
      //   console.log("Something went wrong.");
      // });
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
  db.query("SELECT * FROM role", function (err, results) {
    console.log("\n");
    console.table(results);
  });
  empTracker();
};

// function for viewEmployees
const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log("\n");
    console.table(results);
  });
  empTracker();
};

// function for addDepartment
// inquirer .prompt([message: What is the name of the department?])
// 2 Queries
// INSERT INTO (res)
// SELECT * FROM department
const addDepartment = () => {
  db.query("INSERT INTO department (id, name) VALUES");
};

// Quit function
// process.exit() -- exit is a method

empTracker();
