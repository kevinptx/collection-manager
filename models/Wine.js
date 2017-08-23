// require the stuff
const mongoose = require("mongoose")
// do the stuff

// define the schema
const wineSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  country: {type: String, required: true},
})

const Wine = mongoose.model("Wine", wineSchema)
// create a model using that schema

// export the stuff
module.exports = Wine;
