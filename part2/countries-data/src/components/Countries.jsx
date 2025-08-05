import Country from './Country.jsx'
import { useState, useEffect } from 'react'


const Countries = ({ filterString, countries }) => {
	const matches = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))
	const [selectedCountry, setSelectedCountry] = useState(null)

	useEffect(() => {
		setSelectedCountry(null)
	}, [filterString])

	if (matches.length===1) {
		return (
			<Country country={matches[0]}/>
		)
	} 
	
	else if (matches.length <= 10 && matches.length > 1) {
		return (
			<>
			{matches.map(match => 
				<div key={match.ccn3}>
					<p style={{display: 'inline'}}>{match.name.common}</p> 
					<button onClick={() => setSelectedCountry(match)} >show</button>
				</div>
			)}
			{selectedCountry && <Country country={selectedCountry} />}
			</>
		)
	} 
	
	else if (filterString === '') {
		return <p>Enter a filter to look for a country</p>
	} 

	else if (matches.length > 10) {
		return <p>Too many matches, specify another filter</p>
	} 
	
	else {
		return <p>No matches! Check your search term</p>
	}
}

export default Countries