import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('Fetching initial data...')
		axios
		.get('http://localhost:3001/persons')
		.then(response => {
			console.log('Data fetched:', response.data)
			setPersons(response.data)
		})
	}, [])

	const handleNewEntry = (event) => {
		event.preventDefault()
		if (persons.some(({name}) => name === newName)) {
			alert(`${newName} already exists in the phonebook`)
		} else {			
			const newObject = {
				name: newName,
				number: newNumber,
			}
			console.log("New entry", newObject)
			setPersons(persons.concat(newObject))
			setNewName('')
			setNewNumber('')
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<h2>Add a new</h2>
			<PersonForm 
				onSubmit={handleNewEntry}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
			/>
      <h2>Numbers</h2>
			<Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App