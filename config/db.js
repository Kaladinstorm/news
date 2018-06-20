const confValues = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://'+ confValues.hostname +':'+ confValues.port +'/' + confValues.dbName);

