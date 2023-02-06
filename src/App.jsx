import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import images from './img'

function App() {
  const [coord, setcoord] = useState([])
  const [resultado, setresultado] = useState()
  const [weather, setweather] = useState()

  console.log(resultado)

  const [datos, setdatos] = useState({
    pais: '',
    ciudad: ''
  })
  const handleDatos = e => {
    setdatos({ ...datos, [e.target.name]: e.target.value })
  }



  useEffect(() => {
    if (resultado) {
      const APIKEY = "f9e25a887beeb8dbb24a58676f19b482"
      const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${resultado.ciudad}&appid=${APIKEY}`

      axios.get(URL)
        .then(res => {
          setcoord([res.data[0].lat, res.data[0].lon])
        })
        .catch(err => console.log(err))
    }
  }, [resultado])

  console.log(coord)

  useEffect(() => {
    if (coord) {
      const APIKEY = "f9e25a887beeb8dbb24a58676f19b482"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${APIKEY}`

      axios.get(URL)
        .then(res => {
          setweather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coord])



  return (
    <div className='card_first'>
      <div className='App'>
        <WeatherCard
          weather={weather} datos={datos} handleDatos={handleDatos} setresultado={setresultado} />
      </div>
    </div>
  )
}

export default App
