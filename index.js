const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('postData',  (request, response) => { 
    if (request.method === 'POST') {
        return (
            JSON.stringify(request.body )
        )
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    //console.log(request.method)
    response.json(persons)
})

app.get('/info', (request, response) => {
    console.log("info")
    response.send(`Phonebook has info for ${persons.length} people <br/><br/> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

/*const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}*/

app.post('/api/persons', (request, response) => {
  const body = request.body
  //console.log("Skal poste. ",request.body)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Missing name or/and number' 
    })
  }
  //const index = persons.findIndex(person => person.name === body.name)
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
      })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 1000000))
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*{
    "id": "5",
    "name": "Oggy",
    "number": "94434112"
}*/