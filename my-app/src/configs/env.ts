export const env = {
  groqApiKey: process.env.GROQ_API_KEY
}

export const assertGroqApiKey = (): string => {
  if (!env.groqApiKey) {
    throw new Error('Falta GROQ_API_KEY en las variables de entorno')
  }

  return env.groqApiKey
}
