-- viewDepartments
-- view all departments in department table
SELECT * FROM department;

-- view all roles in role table
SELECT * FROM role;

-- view all employees in employee table
SELECT * FROM employee;

-- viewRoles
SELECT role.id, role.title, role.salary, department.name as department FROM role JOIN department ON role.department_id = department.id

-- viewEmployees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id

-- addDepartment
INSERT INTO department SET name = ?

-- addRole
SELECT id as value, name FROM department

INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")

-- addEmployee
SELECT id AS value, title AS name FROM role

SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id is null

INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?

-- updateRole
SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee

SELECT id as value, title as name FROM role

UPDATE employee SET role_id = ? WHERE id = ?