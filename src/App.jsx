import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import img from './img'

function App() {
  const [coord, setcoord] = useState([])
  const [resultado, setresultado] = useState()
  const [weather, setweather] = useState()
  const [change, setchange] = useState(true)
  const Card = useRef()


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
    if (coord[0] && coord[1]) {
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

  const tiltEffect = e => {
    const marginX = (window.innerWidth - e.target.clientWidth) / 2
    const marginY = (window.innerHeight - e.target.clientHeight) / 2
    const perspectiveX = e.clientX - marginX - (e.target.clientWidth / 2)
    const perspectiveY = e.clientY - marginY - (e.target.clientHeight / 2)
    Card.current.style.transitionTimingFunction = 'ease-out'
    Card.current.style.transitionDuration = '300ms'
    Card.current.style.transform = `perspective(2300px) translate3d(0,0,100px) rotateX(${-perspectiveY / 15}deg) rotateY(${perspectiveX / 15}deg) `
  }
  const disableAnimation = e => {
    Card.current.style.transform = ''
    Card.current.style.transitionTimingFunction = ''
    Card.current.style.transitionDuration = ''
  }


  return (
    <div style={{ backgroundImage: `url(${background})` }} className='card_first'>
      <div ref={Card} onMouseMove={tiltEffect} onMouseOut={disableAnimation} className='App'>
        <WeatherCard
          weather={weather} resultado={resultado} datos={datos} setweather={setweather} handleDatos={handleDatos} setresultado={setresultado} />
      </div>
    </div>
  )
}

export default App
