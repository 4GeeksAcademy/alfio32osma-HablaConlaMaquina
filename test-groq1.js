require('dotenv').config()

const requestWithAuthentication = async () => {

  let url = `https://console.groq.com/dashboard/usage`  

  // Leo el valor de la API key desde el archivo .env
  const apiKey = process.env.API_SECRET_KEY

  if (!apiKey) {
    console.log('Error: no se encontro API_SECRET_KEY en el archivo .env')
    return false
  }
  
  // Creo un objeto denominado 'options' en el cual defino la Autenticación, agregando la API_Key
  let options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  }
  
  // Ejecuto el fetch() con la url y opciones definidas previamente
  const response = await fetch(url, options)
  
  // Valido el resultado de la petición
  if (!response.ok) {
    console.log('Error', response.status, response.statusText)
    return false
  }
  
  // Extraigo los datos JSON de la petición
  const data = await response.json()
  
  // Retorno los datos obtenidos
  return data
}

requestWithAuthentication()
  .then((data) => {
    if (data) {
      console.log('Respuesta:', data)
    }
  })
  .catch((error) => {
    console.error('Error al ejecutar la solicitud:', error.message)
  })