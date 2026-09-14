import { permisos, usuarios } from "@/lib/data";
import { BotonPrimario, Cabecera } from "@/components/ui";

export default function UsuariosPage() {
  return (
    <>
      <Cabecera
        titulo="Usuarios y permisos"
        descripcion="Dos perfiles con necesidades distintas sobre los mismos datos: el administrador gestiona la plataforma, el merchandiser monta y emite. Separarlos evita que quien prepara una campaña pueda tocar la infraestructura sin querer."
        accion={<BotonPrimario>Invitar usuario</BotonPrimario>}
      />

      <div className="grid gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <h2 className="mb-3 text-[11px] tracking-wide text-text-faint uppercase">
            Cuentas activas
          </h2>
          <ul className="flex flex-col gap-2.5">
            {usuarios.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-panel)] border border-line bg-surface px-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{u.nombre}</p>
                  <p className="truncate text-[12px] text-text-faint">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-text-muted">{u.ambito}</span>
                  <span
                    className={[
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      u.perfil === "Administrador"
                        ? "border-brand/50 bg-brand-wash text-brand"
                        : "border-line bg-inset text-text-secondary",
                    ].join(" ")}
                  >
                    {u.perfil}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-text-faint">
            Último acceso registrado por cuenta: {usuarios[0].ultimoAcceso}, {usuarios[1].ultimoAcceso}…
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-[11px] tracking-wide text-text-faint uppercase">
            Qué puede hacer cada perfil
          </h2>
          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-surface">
                  <th
                    scope="col"
                    className="border-b border-line px-4 py-2.5 text-[11px] font-medium tracking-wide text-text-faint uppercase"
                  >
                    Acción
                  </th>
                  <th
                    scope="col"
                    className="w-16 border-b border-line px-2 py-2.5 text-center text-[11px] font-medium tracking-wide text-text-faint uppercase"
                  >
                    Admin
                  </th>
                  <th
                    scope="col"
                    className="w-16 border-b border-line px-2 py-2.5 text-center text-[11px] font-medium tracking-wide text-text-faint uppercase"
                  >
                    Merch
                  </th>
                </tr>
              </thead>
              <tbody>
                {permisos.map((p) => (
                  <tr key={p.accion} className="bg-base">
                    <td className="border-b border-line px-4 py-2.5 text-[13px] text-text-secondary">
                      {p.accion}
                    </td>
                    <td className="border-b border-line px-2 py-2.5 text-center">
                      <Marca activo={p.admin} />
                    </td>
                    <td className="border-b border-line px-2 py-2.5 text-center">
                      <Marca activo={p.merch} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

function Marca({ activo }: { activo: boolean }) {
  return activo ? (
    <span className="text-brand" aria-label="permitido">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="inline" aria-hidden="true">
        <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : (
    <span className="text-text-faint" aria-label="no permitido">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="inline" aria-hidden="true">
        <path d="M4 8h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
