const Persons = ({persons, filter}) => {
	return (
		<div>
			{persons
				.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
				.map(({name, number}) => <p key={name}>{name} {number}</p>)
			}
		</div>
	)
}
export default Persons