const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// HOX validators might work only in creation, when using schema
// e.g when updating model validations see discussion about solutions
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
// try whether this setting "mongoose.set('runValidators', true); "
// just before app.js connectMongo
const categorySchema = mongoose.Schema({
    categoryName: {
      type: String,
      required:true,
      unique: true,
      minlength: 4,
      maxlength: 20
    },
    date: Date, 
    author: String, 
    user_id: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Threads'
    }]
  })

  categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  categorySchema.plugin(uniqueValidator)

  module.exports = mongoose.model('Categories', categorySchema, 'categories')