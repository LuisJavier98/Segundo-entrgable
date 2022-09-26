import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import images from './img'

function App() {
  const [background, setbackground] = useState()
  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()
  const [arrive, setarrive] = useState(true)

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setcoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIKEY = "f9e25a887beeb8dbb24a58676f19b482"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      setTimeout(() => {
        axios.get(URL)
          .then(res => {
            setweather(res.data)
            setarrive(!arrive)
          })
          .catch(err => console.log(err))
      }, 3100);
    }
  },
    [coords])

    
  useEffect(() => {
    if (weather) {
      const data = (weather.weather[0].description).split("")
      const words = data.filter(a => a != " ")
      const wordstogether = words.reduce((a, b) => a + b)
      setbackground(images[wordstogether])
    }
  }
    , [weather])

  return (
    <div style={{ backgroundImage: `url(${background})` }} className='card_first'>
      <div className='App'>
        {arrive ? <img className='image' src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!c1024wm0" alt="loading" /> :
          <WeatherCard
            weather={weather} />}
      </div>
    </div>
  )
}

export default App
