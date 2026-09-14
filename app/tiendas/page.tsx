import { tiendas } from "@/lib/data";
import { BotonPrimario, Cabecera } from "@/components/ui";

export default function TiendasPage() {
  return (
    <>
      <Cabecera
        titulo="Tiendas y dispositivos"
        descripcion="El listado muestra código, nombre y dirección completa: quien emite tiene que reconocer la tienda de un vistazo, sin abrir la ficha para comprobar cuál es."
        accion={<BotonPrimario>Añadir tienda</BotonPrimario>}
      />

      <div className="px-5 py-6 sm:px-8">
        <div className="mb-5 flex flex-wrap gap-1.5">
          {["Todas las tiendas", "Flagship", "Centros comerciales", "Calle", "Levante", "Norte"].map(
            (g, i) => (
              <span
                key={g}
                className={[
                  "rounded-full border px-3 py-1.5 text-[12px]",
                  i === 0
                    ? "border-brand/50 bg-brand-wash text-brand"
                    : "border-line bg-surface text-text-secondary",
                ].join(" ")}
              >
                {g}
              </span>
            ),
          )}
        </div>

        <div className="overflow-x-auto rounded-[var(--radius-panel)] border border-line">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-surface">
                {["Código", "Tienda", "Dirección", "Grupo", "Dispositivos"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-line px-4 py-3 text-[11px] font-medium tracking-wide text-text-faint uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiendas.map((t) => {
                const incidencia = t.enLinea < t.dispositivos;
                return (
                  <tr key={t.codigo} className="bg-base transition-colors hover:bg-surface">
                    <td className="border-b border-line px-4 py-3 font-mono text-[12px] text-text-muted">
                      {t.codigo}
                    </td>
                    <td className="border-b border-line px-4 py-3 text-sm">{t.nombre}</td>
                    <td className="border-b border-line px-4 py-3 text-sm text-text-muted">
                      {t.direccion}
                    </td>
                    <td className="border-b border-line px-4 py-3 text-sm text-text-secondary">
                      {t.grupo}
                    </td>
                    <td className="border-b border-line px-4 py-3">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 text-[13px] tabular-nums",
                          incidencia ? "text-warning" : "text-text-secondary",
                        ].join(" ")}
                      >
                        <span
                          className={`size-1.5 rounded-full ${incidencia ? "bg-warning" : "bg-success"}`}
                          aria-hidden="true"
                        />
                        {t.enLinea} de {t.dispositivos} en línea
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
