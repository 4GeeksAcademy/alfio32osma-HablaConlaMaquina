# Prototipo de Chat con Inteligencia Artificial (Groq + Llama 3)

Este proyecto consiste en el desarrollo de un prototipo de interfaz de chat que se conecta con la API de Groq para interactuar con el modelo **Llama 3 de Meta**. El objetivo principal es construir una aplicación funcional donde los datos de consumo y sesión sean precisos, legibles y persistentes.

## 📋 Requerimientos del Proyecto (Brief del Tech Lead)

* **Interfaz de Chat:** Una interfaz de usuario interactiva donde el usuario pueda escribir mensajes y recibir respuestas en tiempo real de la IA.
* **Autenticación con Groq:** Configuración de una cuenta en Groq con una API Key almacenada de forma segura como variable de entorno.
* **Modelo Utilizado:** Integración con el modelo **Llama 3 de Meta**, disponible en el plan gratuito de Groq.
* **Métricas de Consumo (Objeto `usage`):** Registro y visualización del consumo de tokens para toda la sesión. Se debe mostrar:
    * Tokens de prompt.
    * Tokens de completado (completion).
    * Totales acumulados.
* **Métricas Adicionales:** Mostrar al menos una métrica de rendimiento adicional en la interfaz. Las opciones válidas incluyen:
    * Nombre del modelo utilizado.
    * Tiempo de respuesta de la API.
    * Tokens por segundo.
* **Persistencia del Historial:** El historial de la conversación debe sobrevivir a una recarga de página. El usuario no debe perder su sesión actual si cierra accidentalmente la pestaña del navegador.

> 💡 **Nota sobre el diseño:** Al ser un prototipo, la interfaz no necesita ser perfecta visualmente, pero los datos mostrados deben ser precisos y estar siempre actualizados.

---

## 🔐 Autenticación con la API Externa (Bearer Token)

Para establecer la identidad y comunicarse de forma segura con el servidor de Groq, se utiliza un **Bearer Token** (la API Key generada en tu cuenta). Este token actúa como un pase de sesión que otorga acceso a los recursos de la API.

### Configuración de Seguridad

1.  **Cabecera de la Petición:** Las solicitudes HTTP enviadas a la API deben incluir la cabecera de autorización estructurada de la siguiente manera:
    ```http
    Authorization: Bearer TU_API_KEY_AQUÍ
    ```
2.  **Manejo de Errores:** Si la API Key no se envía o es incorrecta, el servidor rechazará la petición devolviendo un error **`401 Unauthorized`**.
3.  **Variables de Entorno (`.env`):** Por motivos estrictos de seguridad, **la API Key nunca debe escribirse directamente en el código ni subirse a repositorios públicos como GitHub**. Debe almacenarse en un archivo local `.env`:
    ```env
    GROQ_API_KEY=tu_api_key_aqui
    ```
