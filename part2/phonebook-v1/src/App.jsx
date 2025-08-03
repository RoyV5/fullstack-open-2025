import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

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