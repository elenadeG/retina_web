"use client";

import { useMemo, useRef, useState } from "react";
import { DURACION_TOTAL, pistas, type Clip } from "@/lib/data";

const coloresPista: Record<Clip["tipo"], string> = {
  video: "border-brand/60 bg-brand/15 text-brand",
  imagen: "border-info/60 bg-info/15 text-info",
  rotulo: "border-warning/60 bg-warning/15 text-warning",
  audio: "border-success/60 bg-success/15 text-success",
};

export default function EditorPage() {
  const [clipId, setClipId] = useState<string>("c2");
  const [segundo, setSegundo] = useState<number>(52);
  const reglaRef = useRef<HTMLDivElement>(null);

  const clip = useMemo(
    () => pistas.flatMap((p) => p.clips).find((c) => c.id === clipId) ?? null,
    [clipId],
  );

  function moverCabezal(evento: React.MouseEvent<HTMLDivElement>) {
    const caja = reglaRef.current?.getBoundingClientRect();
    if (!caja) return;
    const ratio = Math.min(Math.max((evento.clientX - caja.left) / caja.width, 0), 1);
    setSegundo(Math.round(ratio * DURACION_TOTAL));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-medium">Lanzamiento otoño · Consolas</h1>
          <p className="text-[12px] text-text-faint">
            SEC-1042 · 86 tiendas · guardado hace 2 minutos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-[var(--radius-control)] border border-line px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-line-strong hover:text-text-primary"
          >
            Previsualizar
          </button>
          <button
            type="button"
            className="rounded-[var(--radius-control)] bg-brand px-3.5 py-1.5 text-sm font-medium text-[#04211f] transition-colors hover:bg-brand-dim"
          >
            Emitir
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[232px_minmax(0,1fr)_288px]">
        {/* Izquierda · documentos */}
        <section className="panel-scroll overflow-y-auto border-line lg:border-r">
          <PanelTitulo>Biblioteca</PanelTitulo>
          <ul className="flex flex-col gap-1 p-2">
            {pistas
              .flatMap((p) => p.clips)
              .map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setClipId(c.id)}
                    aria-pressed={clipId === c.id}
                    className={[
                      "flex w-full items-center gap-2.5 rounded-[var(--radius-control)] px-2.5 py-2 text-left text-[13px] transition-colors",
                      clipId === c.id
                        ? "bg-brand-wash text-text-primary"
                        : "text-text-muted hover:bg-hover hover:text-text-primary",
                    ].join(" ")}
                  >
                    <span
                      className={`size-2 shrink-0 rounded-[2px] ${puntoTipo[c.tipo]}`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{c.nombre}</span>
                  </button>
                </li>
              ))}
          </ul>
          <div className="mx-2 mt-2 mb-4 rounded-[var(--radius-control)] border border-dashed border-line-strong px-3 py-5 text-center">
            <p className="text-[13px] text-text-secondary">Arrastra archivos aquí</p>
            <p className="mt-1 text-[11px] text-text-faint">MP4, JPG, PNG, MP3 · hasta 500 MB</p>
          </div>
        </section>

        {/* Centro · previsualización */}
        <section className="flex flex-col border-line lg:border-r">
          <PanelTitulo>Previsualización</PanelTitulo>
          <div className="flex flex-1 items-center justify-center bg-inset p-5 sm:p-8">
            <div className="w-full max-w-2xl">
              <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-[var(--radius-panel)] border border-line bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(10,183,184,0.22),transparent_62%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <p className="px-6 text-lg font-bold tracking-tight text-text-primary">
                    {clip ? clip.nombre.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ") : "Sin clip"}
                  </p>
                  <p className="text-[12px] text-text-muted">
                    1920 × 1080 · pantalla de escaparate
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] text-text-faint tabular-nums">
                <span>{formatoTiempo(segundo)}</span>
                <span>{formatoTiempo(DURACION_TOTAL)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Derecha · propiedades */}
        <section className="panel-scroll overflow-y-auto border-t border-line lg:border-t-0">
          <PanelTitulo>Propiedades</PanelTitulo>
          {clip ? (
            <div className="flex flex-col gap-4 p-4">
              <div className="rounded-[var(--radius-control)] border-l-2 border-brand bg-raised px-3 py-2.5">
                <p className="truncate text-[13px] font-medium">{clip.nombre}</p>
                <p className="mt-0.5 text-[11px] text-text-faint capitalize">{clip.tipo}</p>
              </div>

              <Campo etiqueta="Entrada" valor={formatoTiempo(clip.inicio)} />
              <Campo etiqueta="Duración" valor={formatoTiempo(clip.duracion)} />
              <Campo etiqueta="Salida" valor={formatoTiempo(clip.inicio + clip.duracion)} />

              <div>
                <label
                  htmlFor="ajuste"
                  className="text-[11px] tracking-wide text-text-faint uppercase"
                >
                  Ajuste en pantalla
                </label>
                <select
                  id="ajuste"
                  defaultValue="cubrir"
                  className="mt-1.5 w-full rounded-[var(--radius-control)] border border-line bg-inset px-2.5 py-2 text-[13px] text-text-primary"
                >
                  <option value="cubrir">Cubrir</option>
                  <option value="contener">Contener</option>
                  <option value="original">Tamaño original</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="repeticion"
                  className="text-[11px] tracking-wide text-text-faint uppercase"
                >
                  Repetición
                </label>
                <select
                  id="repeticion"
                  defaultValue="bucle"
                  className="mt-1.5 w-full rounded-[var(--radius-control)] border border-line bg-inset px-2.5 py-2 text-[13px] text-text-primary"
                >
                  <option value="bucle">En bucle</option>
                  <option value="una">Una vez</option>
                </select>
              </div>

              <p className="border-t border-line pt-3 text-[12px] leading-relaxed text-text-faint">
                Ni efectos, ni transiciones, ni ajustes de color. Cada cosa que se quitó es un error
                que ya no se puede cometer.
              </p>
            </div>
          ) : (
            <p className="p-4 text-[13px] text-text-muted">Selecciona un clip.</p>
          )}
        </section>
      </div>

      {/* Abajo · el canal */}
      <section className="border-t border-line bg-surface">
        <div className="flex items-center justify-between px-4 py-2.5">
          <h2 className="text-[11px] tracking-wide text-text-faint uppercase">Canal</h2>
          <p className="text-[12px] text-text-secondary tabular-nums">
            {formatoTiempo(segundo)} <span className="text-text-faint">/ {formatoTiempo(DURACION_TOTAL)}</span>
          </p>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <div className="min-w-[560px]">
            <div
              ref={reglaRef}
              onClick={moverCabezal}
              className="relative mb-1.5 h-6 cursor-pointer border-b border-line"
              role="presentation"
            >
              {Array.from({ length: 9 }).map((_, i) => {
                const t = Math.round((DURACION_TOTAL / 8) * i);
                return (
                  <span
                    key={i}
                    className="absolute top-1 text-[10px] text-text-faint tabular-nums"
                    style={{ left: `${(t / DURACION_TOTAL) * 100}%`, transform: i === 8 ? "translateX(-100%)" : undefined }}
                  >
                    {formatoTiempo(t)}
                  </span>
                );
              })}
              <span
                className="pointer-events-none absolute -top-0 bottom-0 w-px bg-brand"
                style={{ left: `${(segundo / DURACION_TOTAL) * 100}%` }}
                aria-hidden="true"
              />
            </div>

            <div className="relative flex flex-col gap-1.5">
              {pistas.map((pista) => (
                <div key={pista.id} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 truncate text-[12px] text-text-muted">
                    {pista.nombre}
                  </span>
                  <div className="relative h-9 flex-1 rounded-[var(--radius-control)] bg-inset">
                    {pista.clips.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setClipId(c.id)}
                        aria-pressed={clipId === c.id}
                        title={c.nombre}
                        className={[
                          "absolute top-0 bottom-0 overflow-hidden rounded-[5px] border px-2 text-left text-[11px] transition-shadow",
                          coloresPista[c.tipo],
                          clipId === c.id ? "ring-2 ring-brand ring-offset-1 ring-offset-inset" : "",
                        ].join(" ")}
                        style={{
                          left: `${(c.inicio / DURACION_TOTAL) * 100}%`,
                          width: `${(c.duracion / DURACION_TOTAL) * 100}%`,
                        }}
                      >
                        <span className="block truncate leading-[34px]">{c.nombre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <span
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-brand"
                style={{ left: `calc(6rem + 0.75rem + ((100% - 6rem - 0.75rem) * ${segundo / DURACION_TOTAL}))` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const puntoTipo: Record<Clip["tipo"], string> = {
  video: "bg-brand",
  imagen: "bg-info",
  rotulo: "bg-warning",
  audio: "bg-success",
};

function PanelTitulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-line px-4 py-2.5 text-[11px] tracking-wide text-text-faint uppercase">
      {children}
    </h2>
  );
}

function Campo({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2">
      <span className="text-[11px] tracking-wide text-text-faint uppercase">{etiqueta}</span>
      <span className="text-[13px] text-text-secondary tabular-nums">{valor}</span>
    </div>
  );
}

function formatoTiempo(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
