const Persons = ({name, number, handleRemove, id}) => {
	return (
		<div>
			<span>{name} {number}</span>
			<button style={{display: 'inline'}} onClick={() => handleRemove(name, id)}>delete</button>
		</div>
	)
}
export default Persons