import Link from "next/link";
import { secuencias } from "@/lib/data";
import { BotonPrimario, Cabecera, Dato, EstadoPill } from "@/components/ui";

export default function SecuenciasPage() {
  const emitiendo = secuencias.filter((s) => s.estado === "emitiendo").length;
  const tiendasCubiertas = 214;

  return (
    <>
      <Cabecera
        titulo="Secuencias"
        descripcion="Lo que se está emitiendo, lo que está programado y lo que sigue en borrador. Cada secuencia lleva su ventana de fechas y los grupos de tiendas a los que llega."
        accion={<BotonPrimario>Nueva secuencia</BotonPrimario>}
      />

      <div className="px-5 py-6 sm:px-8">
        <dl className="mb-7 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-4">
          {[
            { etiqueta: "Emitiendo ahora", valor: String(emitiendo) },
            { etiqueta: "Tiendas cubiertas", valor: `${tiendasCubiertas} / 230` },
            { etiqueta: "Dispositivos en línea", valor: "1.284" },
            { etiqueta: "Incidencias abiertas", valor: "3" },
          ].map((d) => (
            <div key={d.etiqueta} className="bg-surface px-4 py-3.5">
              <dt className="text-[11px] tracking-wide text-text-faint uppercase">
                {d.etiqueta}
              </dt>
              <dd className="mt-1 text-2xl font-bold tabular-nums">{d.valor}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-col gap-3">
          {secuencias.map((s) => (
            <li key={s.id}>
              <Link
                href="/editor"
                className="block rounded-[var(--radius-panel)] border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-raised sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-base font-medium">{s.nombre}</h2>
                      <EstadoPill estado={s.estado} />
                    </div>
                    <p className="mt-1 max-w-[70ch] text-sm text-text-muted">{s.descripcion}</p>
                  </div>
                  <span className="font-mono text-[11px] text-text-faint">{s.id}</span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Dato
                    etiqueta="Ventana"
                    valor={`${formatearFecha(s.desde)} — ${formatearFecha(s.hasta)}`}
                  />
                  <Dato etiqueta="Duración" valor={s.duracion} />
                  <Dato etiqueta="Tiendas" valor={String(s.tiendas)} />
                  <Dato etiqueta="Actualizada" valor={s.actualizada} />
                </dl>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {s.grupos.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-line bg-inset px-2.5 py-1 text-[11px] text-text-secondary"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-[68ch] text-sm text-text-faint">
          Las tiendas seleccionadas no se esconden detrás de un contador: quedan desplegadas como
          fichas visibles, porque el error caro en esta herramienta no es tardar un minuto más, es
          emitir en la tienda equivocada.
        </p>
      </div>
    </>
  );
}

function formatearFecha(iso: string) {
  const [, mes, dia] = iso.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${Number(dia)} ${meses[Number(mes) - 1]}`;
}
