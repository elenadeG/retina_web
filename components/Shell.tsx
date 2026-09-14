"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navegacion = [
  { href: "/", etiqueta: "Secuencias", icono: SecuenciasIcon },
  { href: "/editor", etiqueta: "Editor", icono: EditorIcon },
  { href: "/tiendas", etiqueta: "Tiendas", icono: TiendasIcon },
  { href: "/usuarios", etiqueta: "Usuarios", icono: UsuariosIcon },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const ruta = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-base lg:flex-row">
      <aside className="flex shrink-0 items-center gap-2 border-b border-line bg-surface px-4 py-3 lg:w-60 lg:flex-col lg:items-stretch lg:gap-1 lg:border-r lg:border-b-0 lg:px-3 lg:py-5">
        <Link
          href="/"
          className="mr-3 flex items-center gap-2 lg:mr-0 lg:mb-7 lg:px-2"
          aria-label="Retina, inicio"
        >
          <Logotipo />
        </Link>

        <nav className="flex flex-1 gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navegacion.map(({ href, etiqueta, icono: Icono }) => {
            const activo = ruta === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={activo ? "page" : undefined}
                className={[
                  "flex items-center gap-2.5 rounded-[var(--radius-control)] px-3 py-2 text-sm whitespace-nowrap transition-colors",
                  activo
                    ? "bg-brand-wash text-brand"
                    : "text-text-muted hover:bg-hover hover:text-text-primary",
                ].join(" ")}
              >
                <Icono />
                {etiqueta}
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-line pt-4 lg:block">
          <p className="px-2 text-[11px] leading-relaxed text-text-faint">
            Reconstrucción de portfolio
            <br />
            Diseño y front-end · Elena de Gregorio
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

function Logotipo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M11 3.2 19.2 18H2.8L11 3.2Z"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="13.4" r="2" fill="var(--color-brand)" />
      </svg>
      <span className="text-[15px] font-bold tracking-tight">
        Retina
        <span className="ml-1.5 text-[11px] font-normal text-text-faint">GAME TV</span>
      </span>
    </span>
  );
}

function SecuenciasIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" />
      <path d="M1.5 6h13" stroke="currentColor" />
    </svg>
  );
}

function EditorIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="9" height="9" rx="1.5" stroke="currentColor" />
      <path d="M11.5 7.2 14.5 5v6l-3-2.2" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function TiendasIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 6.5V13h11V6.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M1.8 6.5 3 3h10l1.2 3.5a2 2 0 0 1-3.8.6 2 2 0 0 1-3.8 0 2 2 0 0 1-3.8-.6Z" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

function UsuariosIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.2" cy="6" r="2.5" stroke="currentColor" />
      <path d="M1.8 13.2c.4-2.2 2.2-3.4 4.4-3.4s4 1.2 4.4 3.4" stroke="currentColor" strokeLinecap="round" />
      <path d="M11 4.2a2.3 2.3 0 0 1 0 4.2" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
