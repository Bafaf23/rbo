import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

export default function Movements({ movements = [], icon }) {
  // Formateador para importes en USD
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <div className="h-80 bg-white border border-zinc-200/80 rounded-3xl p-6 flex flex-col gap-5 transition-colors">
      {/* Cabecera de la tarjeta */}
      <div className="flex justify-between items-center gap-2 shrink-0">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-700">
            Movimientos mensuales
          </h3>
          <span className="text-xs text-zinc-500 font-medium">
            Visualiza los 10 últimos movimientos realizados
          </span>
        </div>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-zinc-200/60 flex items-center justify-center text-slate-600 text-sm shrink-0">
            <Icon icon={icon} />
          </div>
        )}
      </div>

      {/* Contenedor de la lista con Scroll Vertical */}
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
        {movements && movements.length > 0 ? (
          movements.map((m, index) => {
            const isIngreso = m?.type === "ingreso";

            return (
              <div
                key={m?.id || index}
                className="bg-white border border-zinc-200/80 p-3 rounded-2xl shadow-sm hover:shadow hover:bg-zinc-50/50 transition-all flex justify-between items-center shrink-0 gap-3"
              >
                {/* Lado izquierdo: Icono e Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isIngreso
                        ? "bg-emerald-100/60 text-emerald-600"
                        : "bg-red-100/60 text-red-600"
                    }`}
                  >
                    <Icon icon={isIngreso ? faPlus : faMinus} />
                  </span>

                  <div className="flex flex-col min-w-0">
                    <h2
                      className={`text-sm font-bold uppercase truncate max-w-32.5 sm:max-w-50 ${
                        isIngreso ? "text-emerald-700" : "text-zinc-800"
                      }`}
                      title={m?.title}
                    >
                      {m?.title || "Sin título"}
                    </h2>
                    <span className="text-[11px] text-zinc-500 capitalize truncate">
                      {m?.type} {m?.category ? `/ ${m?.category}` : ""}
                    </span>
                  </div>
                </div>

                {/* Lado derecho: Monto */}
                <div className="text-right shrink-0">
                  <span
                    className={`text-base sm:text-lg font-bold tracking-tight ${
                      isIngreso ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {isIngreso ? "+" : "-"}
                    {formatCurrency(m?.amountUsd)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          /* Estado Vacío */
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <p className="text-xs text-zinc-400 font-medium">
              No hay movimientos recientes registrados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}