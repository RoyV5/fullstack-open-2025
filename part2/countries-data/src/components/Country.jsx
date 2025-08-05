const Country = ({ country }) => {

	return (
		<>
			<h1>{country.name.common}</h1>
			<p>Capital {country.capital[0]}</p>
			<p>Area {country.area}</p>
			<h2>Languages</h2>
			<ul>
				{Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
		</>
	)
}

export default Country