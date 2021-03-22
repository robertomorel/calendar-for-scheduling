interface CoordProps {
  lon: number
  lat: number
}

interface WeatherProps {
  main: string
  description: string
}

interface MainProps {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface WindProps {
  speed: number
  deg: number
}

interface CloudsProps {
  all: number
}

export interface WeatherDataProps {
  coord?: CoordProps
  weather?: WeatherProps[] | undefined
  base?: string
  main: MainProps
  visibility: number
  wind: WindProps
  clouds: CloudsProps
}
