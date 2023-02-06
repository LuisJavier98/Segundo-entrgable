import { useEffect, useState } from "react"
import { obtenerCity, obtenerCountry } from "../utils"



const Formulario = ({ handleDatos, datos, setresultado }) => {
  const [countries, setcountries] = useState()
  const [cities, setcities] = useState()

  useEffect(() => {
    obtenerCountry()
      .then(res => setcountries(res))
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    if (datos.pais) {
      obtenerCity(datos)
        .then(res => setcities(res))
        .catch(err => console.log(err))
    }
  }, [datos])

  const handleResultado = e => {
    e.preventDefault()
    setresultado(datos)
  }


  return (
    <form onSubmit={handleResultado} className="formulario">
      <label >Pais</label>
      <select name="pais" id="" onChange={e => handleDatos(e)}>
        <option value="">-- Seleccione un pais --</option>
        {countries?.map(country => <option key={country.country_name} value={country.country_name
        }>{country.country_name} </option>)}
      </select>
      <label >Ciudad</label>
      <select name="ciudad" onChange={e => handleDatos(e)}  >
        <option value="" >-- Seleccione una ciudad --</option>
        {cities?.map(city => <option key={city.state_name} value={city.state_name}>{city.state_name}</option>)}
      </select>
      <input type="submit" value='CONSULTAR CLIMA' />
    </form>
  )
}

export default Formulario