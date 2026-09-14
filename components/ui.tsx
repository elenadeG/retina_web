import type { EstadoSecuencia } from "@/lib/data";

export function Cabecera({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string;
  descripcion: string;
  accion?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-5 py-5 sm:px-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight">{titulo}</h1>
        <p className="mt-1 max-w-[62ch] text-sm text-text-muted">{descripcion}</p>
      </div>
      {accion}
    </header>
  );
}

export function BotonPrimario({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-[var(--radius-control)] bg-brand px-3.5 py-2 text-sm font-medium text-[#04211f] transition-colors hover:bg-brand-dim"
    >
      {children}
    </button>
  );
}

const estilosEstado: Record<EstadoSecuencia, { texto: string; color: string; punto: string }> = {
  emitiendo: { texto: "Emitiendo", color: "text-success", punto: "bg-success" },
  programada: { texto: "Programada", color: "text-info", punto: "bg-info" },
  borrador: { texto: "Borrador", color: "text-warning", punto: "bg-warning" },
  caducada: { texto: "Caducada", color: "text-text-faint", punto: "bg-text-faint" },
};

export function EstadoPill({ estado }: { estado: EstadoSecuencia }) {
  const e = estilosEstado[estado];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-inset px-2.5 py-1 text-[11px] font-medium ${e.color}`}
    >
      <span className={`size-1.5 rounded-full ${e.punto}`} aria-hidden="true" />
      {e.texto}
    </span>
  );
}

export function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] tracking-wide text-text-faint uppercase">{etiqueta}</dt>
      <dd className="mt-0.5 truncate text-sm text-text-secondary tabular-nums">{valor}</dd>
    </div>
  );
}
