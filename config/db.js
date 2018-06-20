const confValues = require('./config.json');
const mongoose = require('mongoose');

if(confValues.username !== "" && confValues.password !== "") 
{
    mongoose.connect('mongodb://'+confValues.username +':'+ confValues.password + '@' + confValues.hostname +':'+ confValues.port +'/' + confValues.dbName);


} else {
    mongoose.connect('mongodb://'+ confValues.hostname +':'+ confValues.port +'/' + confValues.dbName);
}




