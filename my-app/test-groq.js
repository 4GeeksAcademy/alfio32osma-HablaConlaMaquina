export const requestWithAuthentication = async () => {

  let url = `https://console.groq.com/dashboard/usage`  

  // Leo el valor de la API_KEY que guardé en el archivo .env
  let apiKey = import.meta.env.API_SECRET_KEY
  
  // Creo un objeto denominado 'options' en el cual defino la Autenticación, agregando la API_Key
  let options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  }
  
  // Ejecuto el fetch() con la url y opciones definidas previamente
  const response = await fetch(url, options);  
  
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