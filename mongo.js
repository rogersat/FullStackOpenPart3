const mongoose = require('mongoose')



if(process.argv.length < 3) {
  console.log('give password as argument. To list persons use:')
  console.log('node mongo.js password')
  console.log('To add new person:')
  console.log('Node mongo.js yourpassword Anna 040-1234556')
  process.exit(1)
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log('Wrong number of arguments. To list persons use:')
  console.log('node mongo.js password')
  console.log('To add new person:')
  console.log('Node mongo.js yourpassword Anna 040-1234556')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://rogersat:${password}@cluster0.9tl7v.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {    // List persons
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) { // Add new person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}





