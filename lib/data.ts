/**
 * Datos de ejemplo. Ninguno procede de sistemas reales de GAME:
 * códigos, nombres y direcciones son inventados para esta reconstrucción.
 */

export type EstadoSecuencia = "emitiendo" | "programada" | "borrador" | "caducada";

export interface Secuencia {
  id: string;
  nombre: string;
  descripcion: string;
  desde: string;
  hasta: string;
  grupos: string[];
  tiendas: number;
  duracion: string;
  estado: EstadoSecuencia;
  actualizada: string;
}

export const secuencias: Secuencia[] = [
  {
    id: "SEC-1042",
    nombre: "Lanzamiento otoño · Consolas",
    descripcion: "Bucle de 6 clips con el pack de consola y accesorios.",
    desde: "2026-09-14",
    hasta: "2026-10-05",
    grupos: ["Centros comerciales", "Flagship"],
    tiendas: 86,
    duracion: "04:12",
    estado: "emitiendo",
    actualizada: "hace 2 h",
  },
  {
    id: "SEC-1041",
    nombre: "Reservas · Preventa noviembre",
    descripcion: "Cartelería dinámica con fecha de salida y precio de reserva.",
    desde: "2026-09-20",
    hasta: "2026-11-12",
    grupos: ["Todas las tiendas"],
    tiendas: 230,
    duracion: "02:48",
    estado: "programada",
    actualizada: "ayer",
  },
  {
    id: "SEC-1038",
    nombre: "Segunda mano · Cambia y ahorra",
    descripcion: "Tres piezas de vídeo más rótulo de precios por categoría.",
    desde: "2026-09-01",
    hasta: "2026-09-30",
    grupos: ["Calle", "Centros comerciales"],
    tiendas: 142,
    duracion: "03:30",
    estado: "emitiendo",
    actualizada: "hace 4 días",
  },
  {
    id: "SEC-1035",
    nombre: "Torneo local · Tiendas Levante",
    descripcion: "Pendiente de las piezas finales del equipo de marketing.",
    desde: "2026-10-02",
    hasta: "2026-10-04",
    grupos: ["Levante"],
    tiendas: 18,
    duracion: "01:20",
    estado: "borrador",
    actualizada: "hace 6 días",
  },
  {
    id: "SEC-1021",
    nombre: "Rebajas de verano",
    descripcion: "Campaña cerrada. Se conserva como plantilla para el año próximo.",
    desde: "2026-07-01",
    hasta: "2026-08-31",
    grupos: ["Todas las tiendas"],
    tiendas: 228,
    duracion: "05:02",
    estado: "caducada",
    actualizada: "hace 2 semanas",
  },
];

export interface Clip {
  id: string;
  nombre: string;
  tipo: "video" | "imagen" | "rotulo" | "audio";
  inicio: number; // segundos
  duracion: number; // segundos
}

export interface Pista {
  id: string;
  nombre: string;
  tipo: "video" | "audio" | "rotulo";
  clips: Clip[];
}

export const pistas: Pista[] = [
  {
    id: "p-video",
    nombre: "Vídeo",
    tipo: "video",
    clips: [
      { id: "c1", nombre: "Cabecera_otoño.mp4", tipo: "video", inicio: 0, duracion: 38 },
      { id: "c2", nombre: "Pack_consola.mp4", tipo: "video", inicio: 38, duracion: 64 },
      { id: "c3", nombre: "Accesorios_bucle.mp4", tipo: "video", inicio: 102, duracion: 52 },
      { id: "c4", nombre: "Cierre_marca.mp4", tipo: "video", inicio: 154, duracion: 22 },
    ],
  },
  {
    id: "p-rotulo",
    nombre: "Rótulos",
    tipo: "rotulo",
    clips: [
      { id: "c5", nombre: "Precio_pack", tipo: "rotulo", inicio: 42, duracion: 56 },
      { id: "c6", nombre: "Disponible_en_tienda", tipo: "rotulo", inicio: 110, duracion: 40 },
    ],
  },
  {
    id: "p-audio",
    nombre: "Hilo musical",
    tipo: "audio",
    clips: [
      { id: "c7", nombre: "Hilo_septiembre.mp3", tipo: "audio", inicio: 0, duracion: 176 },
    ],
  },
];

export const DURACION_TOTAL = 176; // segundos

export interface Tienda {
  codigo: string;
  nombre: string;
  direccion: string;
  grupo: string;
  dispositivos: number;
  enLinea: number;
}

export const tiendas: Tienda[] = [
  {
    codigo: "MAD-014",
    nombre: "Madrid · Gran Vía",
    direccion: "Gran Vía 42, 28013 Madrid",
    grupo: "Flagship",
    dispositivos: 6,
    enLinea: 6,
  },
  {
    codigo: "MAD-027",
    nombre: "Madrid · La Vaguada",
    direccion: "Avda. Monforte de Lemos 36, 28029 Madrid",
    grupo: "Centros comerciales",
    dispositivos: 4,
    enLinea: 4,
  },
  {
    codigo: "BCN-003",
    nombre: "Barcelona · Diagonal",
    direccion: "Avda. Diagonal 557, 08029 Barcelona",
    grupo: "Centros comerciales",
    dispositivos: 5,
    enLinea: 3,
  },
  {
    codigo: "VLC-008",
    nombre: "València · Colón",
    direccion: "Carrer de Colón 27, 46004 València",
    grupo: "Levante",
    dispositivos: 3,
    enLinea: 3,
  },
  {
    codigo: "SEV-011",
    nombre: "Sevilla · Nervión",
    direccion: "Avda. Luis de Morales 3, 41005 Sevilla",
    grupo: "Centros comerciales",
    dispositivos: 4,
    enLinea: 2,
  },
  {
    codigo: "BIL-002",
    nombre: "Bilbao · Zubiarte",
    direccion: "Leizaola Lehendakariaren 2, 48011 Bilbao",
    grupo: "Calle",
    dispositivos: 3,
    enLinea: 3,
  },
];

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  perfil: "Administrador" | "Merchandiser";
  ambito: string;
  ultimoAcceso: string;
}

export const usuarios: Usuario[] = [
  {
    id: "u-01",
    nombre: "Central · Contenidos",
    email: "contenidos@ejemplo.retina",
    perfil: "Merchandiser",
    ambito: "Todas las tiendas",
    ultimoAcceso: "hoy, 09:14",
  },
  {
    id: "u-02",
    nombre: "Central · Sistemas",
    email: "sistemas@ejemplo.retina",
    perfil: "Administrador",
    ambito: "Plataforma completa",
    ultimoAcceso: "hoy, 08:02",
  },
  {
    id: "u-03",
    nombre: "Coordinación Levante",
    email: "levante@ejemplo.retina",
    perfil: "Merchandiser",
    ambito: "Grupo Levante · 18 tiendas",
    ultimoAcceso: "ayer, 17:40",
  },
  {
    id: "u-04",
    nombre: "Coordinación Norte",
    email: "norte@ejemplo.retina",
    perfil: "Merchandiser",
    ambito: "Grupo Norte · 24 tiendas",
    ultimoAcceso: "hace 3 días",
  },
];

export const permisos: { accion: string; admin: boolean; merch: boolean }[] = [
  { accion: "Crear y editar secuencias", admin: true, merch: true },
  { accion: "Emitir a tiendas", admin: true, merch: true },
  { accion: "Subir material a la biblioteca", admin: true, merch: true },
  { accion: "Crear grupos de tiendas", admin: true, merch: false },
  { accion: "Dar de alta dispositivos", admin: true, merch: false },
  { accion: "Gestionar usuarios y permisos", admin: true, merch: false },
];
