const mongoose = require('mongoose')
require('dotenv').config()

/*
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
*/
//const password = process.argv[2]

const url = process.env.MONGODB_URI
  //`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/tecnoforum_db?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    nickname: String
  })

  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const User = mongoose.model('User', userSchema)
  
  const user = new User({
    fullname: 'Jaska Jokunen',
    password: 'sanasala',
    email: 'jaska.jokunen@mail.com',
    nickname: 'Jaska'
  })

  user.save().then(response => {
      console.log('user saved')
  })

  User.find({})
    .then(result => {
      result.forEach(n => {
         console.log(n)
      })  
      mongoose.connection.close()
    })
    
    
    
