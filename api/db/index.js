'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

console.info('Instantiating and configuring the Sequelize object instance...');

const options = {
    host: "104.237.136.127",
    dialect: "mysql",
    port: 3306,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    logging: false
};

const sequelize = new Sequelize('anukula_pure_code', 'anukula_coder', 'R)GPa4Sc}Y1y', options);

const models = {};

// Import all of the models.
fs
    .readdirSync(path.join(__dirname, 'models'))
    .forEach((file) => {
        console.info(`Importing database model from file: ${file}`);
        const model = sequelize.import(path.join(__dirname, 'models', file));
        models[model.name] = model;
    });

// If available, call method to create associations.
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        console.info(`Configuring the associations for the ${modelName} model...`);
        models[modelName].associate(models);
    }
});


sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    })

/** verify connection with database. 
*/
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully (as of Oct 26 2019).');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = {
    sequelize,
    Sequelize,
    models,
};