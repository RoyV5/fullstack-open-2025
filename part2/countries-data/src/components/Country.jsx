import weather from '../services/weather.js'
import Weather from './Weather.jsx'
import { useState, useEffect } from 'react'
const Country = ({ country }) => {
	const [fetchedWeather, setFetchedWeather] = useState(null)

	useEffect(() => {
		const fetchWeather = async () => {
			const [lat, lon] = country.latlng
			const { data, iconUrl} = await weather.get(lat, lon)
			setFetchedWeather({data, iconUrl})
		}
		try {
			fetchWeather()
		} catch {error => console.log(error)}
	}, [])
	const name = country.name.common
	
	return (
		<>
			<h1>{name}</h1>
			<p>Capital {country.capital[0]}</p>
			<p>Area {country.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
			{(fetchedWeather && <Weather name={country.capital} data={fetchedWeather.data} iconUrl={fetchedWeather.iconUrl}/>)}
		</>
	)
}

export default Country