# TodoListJL


## MySql
Create database wit command:
```
CREATE DATABASE todolist;
```

CREATE USER:
```
create user 'johndoe'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
grant all on todolist.* to 'johndoe'@'localhost';
```

CREATE TABLE:
```
create table tasks (
  id INT AUTO_INCREMENT,
  task VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
```

## Server
Run eith command:
```
node src/index.js
```

## Angular

Run with command: 
```
ng serve
```