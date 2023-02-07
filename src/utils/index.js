

export async function obtenerCity(datos, token) {
  const respuesta = await fetch(`https://www.universal-tutorial.com/api/states/${datos.pais.split(',')[1]}`, {
    headers: {
      "Authorization": `jwt ${token}`,
      "Accept": "application/json"
    }
  })
  const resultado = await respuesta.json()
  return resultado
}

export async function obtenerCountry(token) {
  const respuesta = await fetch('https://www.universal-tutorial.com/api/countries/', {
    headers: {
      "Authorization": `jwt ${token}`,
      "Accept": "application/json"
    }
  })
  const resultado = await respuesta.json()
  return resultado
}