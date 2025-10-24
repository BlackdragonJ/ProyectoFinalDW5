# Proyecto Final de Desarrollo Web 💻

Este proyecto es una aplicación web construida con **Next.js 16 (App Router)**, **TailwindCSS** y una base de datos **PostgreSQL (Neon)**.  
El objetivo es desarrollar el frontend del sistema “MultiPedidos” y conectarlo con microservicios en **Spring Boot**, cumpliendo con la arquitectura distribuida propuesta en el curso.

---

## 🚀 Tecnologías utilizadas

- [Next.js 16 (canary)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon PostgreSQL](https://neon.tech/)
- [Vercel](https://vercel.com/) (despliegue)

---

## 📂 Estructura del proyecto

```
📦 ProyectoFinalDW5
 ┣ 📂 app/                 # Rutas, páginas y componentes (Next.js App Router)
 ┣ 📂 public/              # Imágenes y archivos estáticos
 ┣ 📜 next.config.ts       # Configuración de Next.js
 ┣ 📜 tailwind.config.ts   # Configuración de TailwindCSS
 ┣ 📜 postcss.config.js    # Configuración de PostCSS
 ┣ 📜 tsconfig.json        # Configuración de TypeScript
 ┣ 📜 package.json         # Dependencias y scripts
 ┣ 📜 package-lock.json    # Bloqueo de versiones npm
 ┗ 📜 README.md            # Documentación del proyecto
```

---

## 📦 Despliegue

El proyecto está configurado para desplegarse automáticamente en **Vercel**.

### Configuración recomendada en Vercel
- **Framework Preset:** Next.js  
- **Install Command:** `npm ci`  
- **Build Command:** `npm run build`  
- **Node.js Version:** 18 o 20  
- **Environment Variables:** `POSTGRES_URL`

---

## 👨‍💻 Autor

**Julio Rodríguez**  
Universidad Mariano Gálvez de Guatemala  
Proyecto Final — Desarrollo Web 5  

---

## 🪪 Licencia
Este proyecto es de uso académico y no comercial.  
Puedes modificarlo libremente con fines educativos.
