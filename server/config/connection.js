const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
useNewUrlParser: true,
UueUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: true //check if false or true w/ deployment 
});


module.exports = mongoose.connection;
