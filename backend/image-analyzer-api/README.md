# Analizador Inteligente de Contenido de Imágenes - Backend

API serverless que permite recibir imágenes, procesarlas con inteligencia artificial y devolver etiquetas descriptivas junto con su nivel de confianza.

---

## 🚀 Tecnologías Utilizadas

* **Runtime:** Node.js
* **Infraestructura:** AWS Lambda + API Gateway
* **Framework:** Serverless Framework
* **Validación:** Joi
* **Procesamiento de archivos:** Busboy
* **Inteligencia Artificial:** Google Cloud Vision API
* **Rate Limiting:** Upstash Redis

---

## 📁 Estructura del Proyecto

```bash
/backend/image-analyzer-api
```

---

## ⚙️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de contar con:

* Node.js 20 o superior
* AWS CLI configurado
* Cuenta en AWS
* Cuenta en Google Cloud con Vision API habilitada
* Cuenta en Upstash (Redis)

---

## 🧪 Ejecución en Local

```bash
cd backend/image-analyzer-api
npm install
npx serverless offline
```

La API estará disponible localmente para pruebas.

---

## ☁️ Despliegue en AWS

```bash
npx serverless deploy
```

Este comando desplegará la API en AWS Lambda y configurará API Gateway automáticamente.

---

## 🔐 Variables de Entorno

Configura las siguientes variables antes de ejecutar o desplegar:

```env
GOOGLE_CLOUD_PROJECT_ID=tu-project-id
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account", ...}
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxx
MAX_FILE_SIZE_MB=5
```

---

## 📌 Funcionalidades

* 📤 Recepción de imágenes vía API
* 🧠 Análisis automático con Google Vision AI
* 🏷️ Generación de etiquetas descriptivas
* 📊 Nivel de confianza por etiqueta
* 🚫 Rate limiting para control de uso

---

## 📈 Ejemplo de Respuesta

```json
[
  {
    "label": "Dog",
    "confidence": 0.98
  },
  {
    "label": "Pet",
    "confidence": 0.95
  }
]
```

---

## ⚠️ Consideraciones

* Tamaño máximo de archivo configurable (`MAX_FILE_SIZE_MB`)
* Se recomienda usar variables de entorno seguras (no hardcodear credenciales)
* El rate limiting protege la API contra abuso
