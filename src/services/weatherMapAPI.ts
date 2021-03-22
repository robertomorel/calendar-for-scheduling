import axios from 'axios'

import { WeatherDataProps } from './types'

/**
 * For more info, access: https://home.openweathermap.org/
 */

const BASE_URL = 'http://api.openweathermap.org/data/2.5'

const api = axios.create({
  baseURL: BASE_URL,
})

console.log(process.env.REACT_APP_WEATHER_MAP_API_TOKEN)

export const getWeatherInfoByCity = async (city: string): Promise<WeatherDataProps> => {
  const response = await api.get('/weather', {
    params: {
      q: city,
      appid: process.env.REACT_APP_WEATHER_MAP_API_TOKEN,
    },
  })
  return <WeatherDataProps>response.data
}

export default api
