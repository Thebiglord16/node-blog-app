const { Sequelize } = require('sequelize');

const database = "blog";
const username = "postgres";
const password = "";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;