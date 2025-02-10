# SV Ecommerce Simple

![Badge en Desarrollo](https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/santiagoariel98/sv-ecommerce-simple?style=for-the-badge)

[![Demo en Vivo](https://img.shields.io/badge/🔗_Demo_en_Vivo-Click_aquí-blue?style=for-the-badge&logo=vercel)](https://sv-ecommerce-simple.vercel.app)

## 📋 Descripción
SV Ecommerce Simple es un proyecto personal de e-commerce que nació como un MVP (Producto Mínimo Viable) con el objetivo de crear una plataforma de comercio electrónico simple pero funcional. El proyecto está en desarrollo activo y nuevas características se añaden regularmente.

### 🎯 Objetivos del Proyecto
- Crear una plataforma de e-commerce intuitiva y fácil de usar
- Implementar integración con MercadoPago para procesar pagos
- Ofrecer una experiencia de usuario moderna y responsive
- Servir como proyecto de aprendizaje y portafolio

## ✨ Características Actuales
- Catálogo de productos con búsqueda y filtros
- Carrito de compras
- Proceso de checkout integrado con MercadoPago
- Autenticación de usuarios
- Panel de administración básico
- Gestión de órdenes
- Diseño responsivo con Material UI

## 🚧 Características en Desarrollo
- Sistema de reseñas de productos
- Gestión de múltiples categorías
- Panel de administración avanzado
- Historial detallado de pedidos
- Sistema de notificaciones
- Optimización de rendimiento

## 🖼️ Capturas de Pantalla
![Vista Previa](/public/images/sv-ecommerce-simple-1.webp)

## 🚀 Demo Rápida
[Ver demo en vivo](https://sv-ecommerce-simple.vercel.app)  
o  
`git clone https://github.com/santiagoariel98/sv-ecommerce-simple.git`

## 🛠️ Tecnologías Utilizadas
- **Frontend**
  - Next.js 15
  - React 19
  - Material UI 6
  - React Hook Form
  - Zod

- **Backend**
  - Next.js App Router
  - Prisma ORM
  - MongoDB
  - NextAuth.js
  - MercadoPago API

## ⚙️ Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/santiagoariel98/sv-ecommerce-simple.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Copia el archivo .env.example a .env y reemplaza los valores
DATABASE_URL="tu_url_de_mongodb"
AUTH_SECRET="tu_secret" # Puedes generar uno con npx auth secret
AUTH_GITHUB_ID="tu_id_de_github" # https://authjs.dev/getting-started/providers/github
AUTH_GITHUB_SECRET="tu_secret_de_github"
AUTH_GOOGLE_ID="tu_id_de_google" # https://authjs.dev/getting-started/providers/google
AUTH_GOOGLE_SECRET="tu_secret_de_google"
MP_ACCESS_TOKEN="tu_token_de_mercadopago" # Puedes obtener uno en https://www.mercadopago.com.ar/developers/panel
```

4. Inicializa la base de datos:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed # Opcional: carga datos de prueba
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🌐 Demo
Puedes ver una demostración en vivo del proyecto en:
[https://sv-ecommerce-simple.vercel.app](https://sv-ecommerce-simple.vercel.app)

## 🤝 Contribuciones
Este es un proyecto personal en desarrollo, pero las sugerencias y reportes de errores son bienvenidos a través de issues en GitHub.

## 📄 Licencia
Distribuido bajo la licencia [MIT](https://choosealicense.com/licenses/mit/).

## 📬 Contacto
Santiago Ariel - [GitHub](https://github.com/santiagoariel98)

## 🚧 Estado del Proyecto
Este proyecto es un MVP en desarrollo activo. Las funcionalidades pueden cambiar o expandirse con el tiempo. Se recomienda no utilizar en producción sin las debidas modificaciones y pruebas.

## 🙌 Reconocimientos
- Inspirado en [MercadoLibre](https://www.mercadolibre.com.ar) y [Jumbo](https://www.jumbo.com.ar)
