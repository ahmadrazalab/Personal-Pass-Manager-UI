# PASSWORD MANAGER AND GENERATOR TOOL on WEB

![alt text](image.png)


>> HOW TO USE
```
git clone https://github.com/URL
cd <folder>
#update env.example file with your creds
mv .env.example .env
npm i 
npm start
http://localhost:3000/
```

>> DB CREATION QUERY
```
CREATE DATABASE password_manager;

USE password_manager;

CREATE TABLE passwords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```