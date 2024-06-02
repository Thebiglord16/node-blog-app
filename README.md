# Blog App
Welcome! in order to run your project locally please follow the instructions bellow.
## 1. Database setup
### 1.1 PostgreSQL
This project uses PostgreSQL as it's database. You'll need to create a new PostgreSQL database and name it "theblog" (if you want to use a different name, you can look up how in the next step). If you don't know how to create a new database or you're new to PostgreSQL you can check the manual here: https://www.postgresql.org/docs/.
### 1.2 Sequelize configuration
This project uses Sequelize as it's ORM, sequelize needs some configuration in order to connect to the database.
First open back/config/config.json and modify your database information. You'll find 3 config objects where you should put your databases username, password, database name and host.
Second got to back/connections.js and add the same values you placed in config.json in the corresponding constants.
Third on your console navigate to the back folder and run:
```
npm install
```
This will install all the dependencies in the API project.
Third on your console run :
```
npx sequelize-cli db:migrate
```
This will call on the sequelize-cli and run all the migrations on the database you specified in the previous step creating all the necessary tables required by the API.
