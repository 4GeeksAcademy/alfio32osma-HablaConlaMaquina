# Contexto del Reto: Prototipo de Interfaz de Chat con Métricas de IA (Groq)

## 🎯 El Reto
Una pequeña consultora digital ha sido contratada por un cliente que quiere explorar interfaces con Inteligencia Artificial para uso interno. Antes de comprometerse con un producto completo, el *tech lead* del equipo te ha pedido que construyas un **prototipo de interfaz de chat** que se comunique con un modelo de lenguaje real a través de una API externa.

## 📊 Objetivo Principal: Visibilidad y Medición
El objetivo no es solo conseguir que el modelo responda, sino hacer que los datos de la conversación sean **visibles y medibles**. El cliente quiere entender qué ocurre por dentro al interactuar con la IA:
* Cuántos **tokens** está consumiendo cada petición.
* Cómo se **acumula el uso** a lo largo de una sesión completa.
* Qué **otras métricas** ofrece el modelo (como tiempos de respuesta o velocidad de procesamiento).

Esta visibilidad es un requisito crítico que cualquier integración de IA seria necesita implementar desde el primer día.

## 🛠️ Stack Tecnológico y Herramientas
Para cumplir con los requerimientos técnicos del *tech lead*, implementarás las siguientes tecnologías:

1.  **Groq:** Una plataforma que ofrece inferencia ultrarrápida para modelos de lenguaje de código abierto y devuelve metadatos detallados (`usage` / métricas) con cada respuesta.
2.  **React / Next.js:** El framework para construir el frontend del prototipo de la aplicación.
3.  **Gestión de Estado y Persistencia:** El desarrollo debe gestionar correctamente el flujo de datos asíncrono, mantener el estado de la interfaz en tiempo real y asegurar la persistencia de la sesión de chat.
