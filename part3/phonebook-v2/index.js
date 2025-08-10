require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request, response) => {
	if (request.method === 'POST') {
		return JSON.stringify(request.body)
	} else {
		return ''
	}
})

app.use(morgan(':method :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
	Person.find({}).then(result => {
		response.json(result)
	})
})

app.get('/info', (request, response) => {
	Person.find({}).then(result => {
		const amount = result.length
		const date = new Date()
		const message = `<p>Phonebook has info for ${amount} people</p> <p>${date}</p>`
		response.send(message)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(result => {
		if (result) {
			response.json(result)
		} else {
			response.status(404).end()
		}
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
	.then(result => {
		response.status(204).end()
	})
	.catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {	
	const body = request.body
	const {name, number} = body
	const newPerson = new Person({
		name: name,
		number: number,
	})
	newPerson.save().then(person => {
		response.json(person)
	})
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body
	Person.findById(request.params.id)
	.then(person => {
		if (!person) {
			return response.status(404).end()
		} else {
			person.name = name
			person.number = number
			return person.save().then((updatedPerson) => {
				response.json(updatedPerson)
			})
		}
	})
	.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unkown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler) 

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
})

