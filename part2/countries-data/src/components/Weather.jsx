const Weather = ( { name, data, iconUrl }) => {
	return (
		<>
			<h2>Weather in {name}</h2>
			<p>Temperature {data.main.temp} Celcius</p>
			<img src={iconUrl} alt={data.weather.main}/>
			<p>Wind {data.wind.speed} m/s</p>
		</>
	)
}

export default Weather