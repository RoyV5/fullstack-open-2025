const Total = ({parts}) => {
	const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)
	return (
    <p><b>total of {total} exercises</b></p>
  )
}

export default Total