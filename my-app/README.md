# Prototipo Base - Groq + Llama 3

Proyecto base en Next.js con interfaz de chat, conexion segura a Groq y metricas de consumo por sesion.

## Requisitos implementados

- Chat interactivo con envio de mensajes y respuesta del modelo.
- Autenticacion segura con `GROQ_API_KEY` (solo en backend).
- Integracion con modelo de Llama 3 en Groq.
- Metricas de `usage` acumuladas por sesion:
	- Prompt tokens
	- Completion tokens
	- Tokens totales
- Metricas adicionales:
	- Modelo activo
	- Latencia
	- Tokens por segundo
- Persistencia del historial y metricas en `localStorage`.

## Estructura de carpetas

Se uso una organizacion base inspirada en el modelo de la imagen: por tipo + features.

```text
my-app/
├── app/
│   ├── api/chat/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── src/
		├── assets/
		├── api/
		│   └── chatApi.ts
		├── configs/
		├── components/
		│   ├── chat/
		│   └── common/
		├── hooks/
		│   └── chat/
		├── lib/
		├── services/
		├── states/
		└── utils/
```

## Configuracion

1. Crear archivo `.env.local` en la raiz de `my-app`.
2. Agregar la API key:

```env
GROQ_API_KEY=tu_api_key_aqui
```

## Ejecutar

```bash
npm run dev
```

Abrir `http://localhost:3000`.
