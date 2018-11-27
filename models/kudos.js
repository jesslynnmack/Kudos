const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var KudosSchema = new Schema({
  title: String,
  body: String,
  to: String,
  from: String
});

const Kudos = mongoose.model('Kudos', KudosSchema);

module.exports = Kudos;