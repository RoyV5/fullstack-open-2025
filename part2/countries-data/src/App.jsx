import { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import countriesAPI from './services/countries.js'
import Countries from './components/Countries.jsx'

const App = () => {
	const [countries, setCountries]= useState(null)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await countriesAPI.getAll()
				console.log(response)
				setCountries(response)
			} catch (error) {
			console.error('Error fetching countries:', error)
		}
	}
		fetchData()}, [])

	if (countries === null) {
		return <p>Fetching countries...</p>
	} 

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<Countries filterString={searchTerm} countries={countries} />
    </>
  )
}

export default App
