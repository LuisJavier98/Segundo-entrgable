import { useEffect, useMemo, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import img from './img'

function App() {
  const [coord, setcoord] = useState([])
  const [resultado, setresultado] = useState()
  const [weather, setweather] = useState()
  const [change, setchange] = useState(true)


  const [datos, setdatos] = useState({
    pais: '',
    ciudad: ''
  })

  const handleDatos = e => {
    setdatos((prev) => { return { ...prev, ciudad: '' } })
    setdatos((prev) => { return { ...prev, [e.target.name]: e.target.value } })
  }


  useEffect(() => {
    if (resultado) {
      const APIKEY = "f9e25a887beeb8dbb24a58676f19b482"
      const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${resultado.ciudad},${resultado.pais.split(',')[0]}&appid=${APIKEY}`

      axios.get(URL)
        .then(res => {
          setcoord([res.data[0].lat, res.data[0].lon])
        })
        .catch(err => window.alert('No se pudo encontrar la ubicacion , por favor intente con otra'))
    }
  }, [resultado])


  useEffect(() => {
    if (coord) {
      const APIKEY = "f9e25a887beeb8dbb24a58676f19b482"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${APIKEY}`

      axios.get(URL)
        .then(res => {
          setweather(res.data),
            setchange(!change)
        })
        .catch(err => console.log(err))
    }
  }, [coord])

  const background = useMemo(() => img[weather?.weather[0].main], [change])

  return (
    <div style={{ backgroundImage: `url(${background})` }} className='card_first'>
      <div className='App'>
        <WeatherCard
          weather={weather} resultado={resultado} datos={datos} setweather={setweather} handleDatos={handleDatos} setresultado={setresultado} />
      </div>
    </div>
  )
}

export default App
