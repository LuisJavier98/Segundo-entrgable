export async function obtenerCity(datos) {
  const respuesta = await fetch(`https://www.universal-tutorial.com/api/states/${datos.pais}`, {
    headers: {
      "Authorization": `jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJsdWlzamF2aWVyXzI3MDVAaG90bWFpbC5jb20iLCJhcGlfdG9rZW4iOiJCUE1hdXhSOGp6YzY3VVhaU1dlN092bWJnM1lsdDQ0NXVRNkVNS3pyMmRZdkkyajhiWXJGMGZQeDNoOXdDTk5BcTM4In0sImV4cCI6MTY3NTcxOTA5OX0.GwmZVYtVD30GFGasmgNdVgUOrSLUFV1dnW0TvLk2Nxs`,
      "Accept": "application/json"
    }
  })
  const resultado = await respuesta.json()
  return resultado
}

export async function obtenerCountry() {
  const respuesta = await fetch('https://www.universal-tutorial.com/api/countries/', {
    headers: {
      "Authorization": `jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJsdWlzamF2aWVyXzI3MDVAaG90bWFpbC5jb20iLCJhcGlfdG9rZW4iOiJCUE1hdXhSOGp6YzY3VVhaU1dlN092bWJnM1lsdDQ0NXVRNkVNS3pyMmRZdkkyajhiWXJGMGZQeDNoOXdDTk5BcTM4In0sImV4cCI6MTY3NTcxOTA5OX0.GwmZVYtVD30GFGasmgNdVgUOrSLUFV1dnW0TvLk2Nxs`,
      "Accept": "application/json"
    }
  })
  const resultado = await respuesta.json()
  return resultado
}