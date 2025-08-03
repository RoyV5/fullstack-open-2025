import Part from './Part.jsx'
const Content = ({parts}) => {
	return (
  <>
    {parts.map(({id, name, exercises}) => (
      <Part key={id} name={name} number={exercises} />
    ))}
  </>
	)
}

export default Content