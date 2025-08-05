import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notifications from './components/Notifications.jsx'
import phonebook from './services/phonebook.js'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notification, setNotification] = useState({ message: null, type: null })

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
					setNotification({ message: `Phone number of ${newName} has been mofified to: ${newNumber}`, type: 'success'})
					setTimeout(() => setNotification({ message: null, type: null}), 5000)
				})
				.catch(error => {
					setNotification({ message: `${newName} has already been deleted from the phonebook, cannot update. error: ${error.message}`, type: 'error'})
					setTimeout(() => setNotification({ message: null, type: null}), 5000)
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
				setNotification({ message: `Entry of ${newName} created succesfully`, type: 'success'})
				setTimeout(() => setNotification({ message: null, type: null}), 5000)
			}) 
			.catch(error => {
				setNotification({ message: `Failure to create ${newName} entry, error: ${error.message}`, type: 'error'})
				setTimeout(() => setNotification({ message: null, type: null}), 5000)
			})
		}
	}

	const handleRemove = (name, id) => {
		if(window.confirm(`Delete the entry ${name}?`)) {
			phonebook.remove(id)
				.then(() => {
					setPersons(persons.filter(person => person.id !== id));
					setNotification({ message: `Entry of ${name} succesfully deleted`, type: 'success'})
					setTimeout(() => setNotification({ message: null, type: null}), 5000)
				})
				.catch(error => {
					setNotification({ message: `Information of ${name} has already been deleted from phonebook, error: ${error.message}`, type: 'error'})
					setTimeout(() => setNotification({ message: null, type: null}), 5000)
				})
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notifications notification={notification}/>
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