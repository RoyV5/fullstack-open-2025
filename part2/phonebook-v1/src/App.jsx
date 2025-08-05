import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import phonebook from './services/phonebook.js'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('Fetching initial data...')
		phonebook.getAll()
		.then(fetchedPersons => setPersons(fetchedPersons))
	}, [])

	const handleNewEntry = event => {
		event.preventDefault()
		const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
		if (existingPerson) {
			if (window.confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`)) {
				phonebook.update(existingPerson.id, {...existingPerson, number: newNumber})
				.then(updatedPerson => {
					setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person ))
					setNewName('')
					setNewNumber('')
				})
				.catch(error => {
					console.log('Failed to update person', error)
				})
			}
		} else {			
			const newObject = {
				name: newName,
				number: newNumber,
			}
			phonebook.create(newObject)
			.then(newPerson => {
				setPersons(persons.concat(newPerson))
				setNewName('')
				setNewNumber('')
			}) 
			.catch(error => {
				console.log('Failed to add person', error)
			})
		}
	}

	const handleRemove = (name, id) => {
		if(window.confirm(`Delete the entry ${name}?`)) {
			phonebook.remove(id)
				.then(() => {
					setPersons(persons.filter(person => person.id !== id));
				})
				.catch(error => {
					console.log(error);
				})
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
			<Persons persons={persons} filter={filter} handleRemove={handleRemove}/>
    </div>
  )
}

export default App