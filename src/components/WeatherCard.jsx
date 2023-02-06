import React, { useState } from 'react'
import Formulario from './Formulario'

const WeatherCard = ({ weather, datos, handleDatos, setresultado }) => {


  const [degree, setdegree] = useState(true)
  let change = () => setdegree(!degree)

  console.log(weather)

  return (
    <>
      <div className='card_weather'>
        <h1 className='card_title'>Weather App</h1>
        <h2 className='card_subtitle'>{weather?.name}, {weather?.sys.country}</h2>
        <div className='card_data'>
          <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather?.weather[0].main} />
          <ul className='card_properties'>
            <div><strong>"{weather?.weather[0].description}"</strong></div>
            <li ><strong>Wind speed:</strong>{weather?.wind.speed}m/s</li>
            <li ><strong>Clouds:</strong>{weather?.clouds.all}%</li>
            <li ><strong>Pressure:</strong> {weather?.main.pressure}hPa</li>
          </ul>
        </div>
        <div className='card_temp'>{degree ? `${(weather?.main.temp - 273.15).toFixed(1)}°C` : `${(((weather?.main.temp - 273.15) * 1.8) + 32).toFixed(1)}°F`} </div>
        <button className='card_button' onClick={change}>{degree ? "Change to °F" : "Change to°C"}</button>
      </div >
      <Formulario datos={datos} handleDatos={handleDatos} setresultado={setresultado} />
    </>
  )
}
export default WeatherCard