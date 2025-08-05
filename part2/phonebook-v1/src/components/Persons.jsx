import Person from './Person.jsx'

const Persons = ({persons, filter, handleRemove}) => {
	return (
		<div>
			{persons
				.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
				.map(({name, number, id}) => <Person key={id} name={name} number={number} id={id} handleRemove={handleRemove}/>)
			}
		</div>
	)
}
export default Persons