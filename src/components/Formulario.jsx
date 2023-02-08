import axios from "axios"
import { useEffect, useState } from "react"
import { obtenerCity, obtenerCountry } from "../utils"



const Formulario = ({ setweather, handleDatos, datos, setresultado, resultado }) => {
  const [countries, setcountries] = useState()
  const [cities, setcities] = useState()
  const [alert, setalert] = useState()
  const [token, settoken] = useState()

  useEffect(() => {
    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        "Accept": "application/json",
        "api-token": "BPMauxR8jzc67UXZSWe7Ovmbg3Ylt445uQ6EMKzr2dYvI2j8bYrF0fPx3h9wCNNAq38",
        "user-email": "luisjavier_2705@hotmail.com"
      }
    })
      .then(res => settoken(res.data.auth_token))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (token) {
      obtenerCountry(token)
        .then(res => setcountries(res))
        .catch(err => console.log(err))
    }
  }, [token])

  useEffect(() => {
    if (datos.pais && token) {
      obtenerCity(datos, token)
        .then(res => setcities(res))
        .catch(err => console.log(err))
    }
  }, [datos, token])


  const handleResultado = e => {
    e.preventDefault()
    if (Object.values(datos).includes('')) {
      setalert('Todos los campos deben estar completos')
    }
    else {
      setresultado(datos)
      setalert()
      if (Object.values(resultado).includes(datos.pais) && Object.values(resultado).includes(datos.ciudad)) {
        window.alert('Actualmente te encuentras observando la peticion que quieres')
      }
      else {
        setalert()
        setweather()
      }
    }
  }


  return (
    <form onSubmit={handleResultado} className="formulario">
      {alert && <div className="mensaje">Todos los campos son obligatorios</div>}
      <label >Pais</label>
      <select name="pais" defaultValue="" id="" onChange={e => { handleDatos(e), setcities() }}>
        <option disabled value="">-- Seleccione un pais --</option>
        {countries?.map(country => <option key={country.country_name} value={[country.country_short_name, country.country_name]}>{country.country_name} </option>)}
      </select>
      <label >Ciudad</label>
      <select name="ciudad" defaultValue="" onChange={e => handleDatos(e)}  >
        <option value="" >-- Seleccione una ciudad --</option>
        {cities?.map(city => <option key={city.state_name} value={city.state_name}>{city.state_name}</option>)}
      </select>
      <input type="submit" value='CONSULTAR CLIMA' />
    </form>
  )
}

export default Formulario