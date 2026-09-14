# Retina · GAME TV — reconstrucción de interfaz

Reconstrucción para portfolio de **Retina**, la plataforma interna con la que se decide, se monta
y se emite el contenido de las pantallas de las tiendas GAME. Diseñé el producto original
(research, arquitectura, UI y sistema de diseño en Figma, y front-end) durante mi etapa en GAME
España; este repositorio reconstruye cuatro de sus pantallas con un stack distinto —Next.js,
React, TypeScript y Tailwind— para mostrar el trabajo de interfaz en código.

**No contiene código, activos ni datos de la empresa.** Todos los datos son inventados: los
códigos de tienda, las direcciones, los nombres de campaña y las cuentas de usuario no existen.

## Pantallas

| Ruta | Qué muestra |
| --- | --- |
| `/` | Listado de secuencias: estado de emisión, ventana de fechas, grupos de tiendas y cobertura. |
| `/editor` | El editor de secuencias. Documentos a la izquierda, previsualización en el centro, propiedades a la derecha y el canal abajo. La línea de tiempo es interactiva: se selecciona un clip y se mueve el cabezal. |
| `/tiendas` | Tiendas y dispositivos, con código, nombre, dirección completa y dispositivos en línea. |
| `/usuarios` | Los dos perfiles —administrador y merchandiser— y la matriz de permisos que los separa. |

## Decisiones de diseño

**Fondo oscuro.** No es una preferencia estética: es la convención de las herramientas de vídeo, y
aquí el contenido que se va a emitir es el protagonista, no el cromo de la aplicación.

**Un solo acento.** El turquesa `#0AB7B8` marca lo que está vivo —el clip seleccionado, el cabezal
de reproducción, la sección activa— y nada más. Los cuatro colores de estado (éxito, aviso,
información, error) se reservan para su función y no compiten con él.

**Una sola familia tipográfica.** DM Sans: geométrica y de ojo grande, aguanta bien los cuerpos
pequeños que exige una herramienta densa.

**Lo que no está.** Ni efectos, ni transiciones, ni ajustes de color. Por debajo esto es un editor
de vídeo; por encima tenía que poder usarlo alguien cuyo trabajo no es editar vídeo. Cada cosa que
se quitó es un error que ya no se puede cometer.

**Tokens antes que pantallas.** Los tokens semánticos del sistema en Figma (`text-primary`,
`text-brand`, superficies, estados) se trasladan uno a uno al tema de Tailwind en
`app/globals.css`, así que el color y la tipografía se cambian en un único sitio.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · DM Sans vía `next/font`.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

---

**Elena de Gregorio** — Product Designer UX/UI y Frontend Developer
[edegregorio.com](https://edegregorio.com) · Caso completo del proyecto original:
[GAME TV · Retina](https://edegregorio.com/es/work/game-retina.html)
