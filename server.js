const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var databaseUri = 'mongodb://localhost/kudos_db';
if (process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}else {
  mongoose.connect(databaseUri);
}

var db = mongoose.connection;
db.on('error', function(err){
  console.log('Mongoose Error: ', err);
});

db.once('open', function(){
  console.log('Mongoose Connection Successful.')
});


require('./routes/api-routes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});