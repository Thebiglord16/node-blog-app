const { Sequelize } = require('sequelize');

const database = "theblog";
const username = "postgres";
const password = "";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres'
});

module.exports = sequelize;