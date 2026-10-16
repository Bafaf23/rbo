import Icon from "../atoms/Icon";

export default function StatCard({
  title,
  amount = null,
  amountBs = null,
  desc,
  porcentaje = 0,
  ingreso = 0,
  icon,
  trendPositive,
  className,
}) {
  // Función auxiliar segura para calcular porcentaje con 2 decimales
  const calcularMonto = () => {
    // Si se pasa 'amount' directamente, se usa ese valor
    if (amount !== null && amount !== undefined) {
      return Number(amount).toFixed(2);
    }
    // Si no, se calcula según el ingreso y el porcentaje
    const valIngreso = Number(ingreso) || 0;
    const valPorcentaje = Number(porcentaje) || 0;
    return ((valIngreso * valPorcentaje) / 100).toFixed(2);
  };

  const montoUsd = calcularMonto();
  const montoBsCalculado = amountBs
    ? (Number(montoUsd) * Number(amountBs)).toLocaleString("es-VE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : null;

  return (
    <div className="h-full bg-white dark:bg-zinc-700 dark:border-zinc-500 border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-zinc-300 transition-colors hover:dark:border-zinc-700 ">
      {/* Cabecera de la tarjeta */}
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-100">
          {title}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-zinc-200/60 flex items-center justify-center text-slate-600 text-sm shrink-0">
            <Icon icon={icon} />
          </div>
        )}
      </div>

      {/* Bloque del Monto y Descripción */}
      <div className="mt-4">
        <div className="flex items-baseline flex-wrap gap-x-2">
          <h4 className={`text-2xl font-black tracking-tight ${className}`}>
            ${montoUsd}
          </h4>
          {amountBs && (
            <span className="text-sm font-bold text-zinc-400 dark:text-zinc-300">
              / Bs {montoBsCalculado}
            </span>
          )}
        </div>

        {desc && (
          <span
            className={`text-xs font-semibold mt-1 dark:text-zinc-300 block ${
              trendPositive === true
                ? "text-emerald-700"
                : trendPositive === false
                  ? "text-rose-600"
                  : "text-zinc-400"
            }`}
          >
            {desc}
          </span>
        )}
      </div>
    </div>
  );
}
