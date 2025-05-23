INSERT INTO departments (id, name)
VALUES (1,'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');;

INSERT INTO roles (id, title, salary, department)
VALUES (1, 'Sales Lead', 100000, 1),
       (2, 'Salesperson', 80000, 1),
       (3, 'Lead Engineer', 150000, 2),
       (4, 'Software Engineer', 120000, 2),
       (5, 'Account Manager', 160000, 3),
       (6, 'Accountant', 125000, 3),
       (7, 'Legal Team Lead', 250000, 4),
       (8, 'Lawyer', 190000, 4);;
       
INSERT INTO employees (id, first_name, last_name,role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
       (2, 'Mike', 'Chan', 1, 1),
       (3, 'Ashley', 'Rodriguez', 1, NULL),
       (4, 'Kevin', 'Tupik', 1, 3 ),
       (5, 'Kunal', 'Singh', 1, NULL),
       (6, 'Malia', 'Brown', 1, 5),
       (7, 'Sarah', 'Lourd', 1, NULL),
       (8, 'Tom', 'Allen', 1, 7);