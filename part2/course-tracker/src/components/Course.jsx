import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({course}) => {
	const {id, name, parts} = course
	return (
		<>
			<Header name={name}/>
			<Content parts={parts}/>
			<Total parts={parts}/>
		</>
	)
}

export default Course