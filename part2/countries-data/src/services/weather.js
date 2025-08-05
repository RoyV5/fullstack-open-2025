import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY 
console.log('API KEY', api_key)
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"

const get = async (latitude, longitude) => {
	const url = `${baseUrl}lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
	const response = await axios.get(url)
	const data = response.data
	const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	return { data, iconUrl }	
}

export default { get }