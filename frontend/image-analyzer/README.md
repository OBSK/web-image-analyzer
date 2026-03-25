# 🖼️ Analizador Inteligente de Contenido de Imágenes - Frontend

Aplicación web que permite subir imágenes, enviarlas a un backend para su análisis con IA y mostrar las etiquetas detectadas junto con su nivel de confianza.

---

## 🚀 Stack

- **Framework:** Next.js  
- **Estilos:** Tailwind CSS  

---

## 📁 Estructura

frontend/
image-analyzer/

---

## ⚙️ Requisitos

- Node.js 20 o superior  
- Cuenta en Vercel  

---

## 🔐 Variables de entorno

NEXT_PUBLIC_API_URL=http://localhost:3000/api/analyze
VERCEL_OIDC_TOKEN=***

---
## ☁️ Despliegue en Vercel
- Dev:
    vercel
- Prod:
    vercel --prod

## 🧪 Ejecución local

```bash
cd frontend/image-analyzer
npm install
npm run dev