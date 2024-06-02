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
## 2. API setup
This project has an API that exposes 3 services to the UI of the blog, to run the API go to the back/ directory and run:
```
npm run dev
```
That's it! you got the API running and can start doing some requests!
## 3. UI setup
This project has an UI that allows client interaction to make requests to the API.
First you have to install all the dependencies, in your console navigate to the ui/ directory and run:
```
npm install
```
Last you have to run:
```
npm run dev
```

That's it! everything should be running correctly and you can start blogging!

## 3. How was it done?
### The API
The API uses express as a web framework. All information used for the project can be found at: https://expressjs.com/.
</br>
The API uses JSONWebToken for authentication, JWT are a common modern way to autheticate users in APIs and offer some neat features. In particular I decided to use JWTs as the payload is of great use later in the UI logic. After some reading in stackoverflow I found jsonwebtoken as the easiest JWT node library to use, and using express easy to implemment middleware functions I was able to create a simple yet robust authetication for the api.
</br>
Following on the topic of authetication, storing passwords as plain text is a big NO, so I used bcrypt to easily hash and salt passwords and stored the hashed password in the database.
</br>
The ORM, in order to easily connect to a database and have models that accordingly represent the tables in the databse I used sequelize as the ORM for the project, it has drivers for many databases and I used PostgreSQL as my database of choice, documentation is enough guidance on how to use it and can be found here: https://sequelize.org/docs/v6/getting-started/.
### The UI
The UI uses ReactJS framework, making web uis in react is simple and fast, you can find more at: https://react.dev/reference/react.
</br>
To create the project and have hot-reloading I used the npm-create vite@latest command, which creates a project with your prefered framework and allows for hot-reloading, making development easier, you can find the needed information here: https://vitejs.dev/guide/.
</br>
Additionally some libraries where used to make the process even simpler:
</br>
react-bootstrap is a widelly used react library that has prebuilt react components with bootstrap styles you can find more at: https://react-bootstrap.netlify.app/docs/getting-started/why-react-bootstrap
</br>
Axios is a widely used JS and TS library that makes the process of doing requests simpler. It was used to make all the API calls required for the UI functionality, all information here: https://axios-http.com/docs/intro
</br>
jwt-decode, after doing the research on the best approach on how to handle authentication and deciding to use JWTs it was necessary to decode the payload of the JWTs in the UI to track user data, I decided to use jwt-decode after some stack-overflow, information on how to use it can be found here: https://www.npmjs.com/package/jwt-decode.
</br>
</br>
Let me know if you have any questions!



