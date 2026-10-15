import Icon from "../atoms/Icon";

export default function TasasBCV({
  title,
  amountUsd = null,
  amountEu = null,
  desc,
}) {
  const parseAmount = (amount) => {
    if (amount === NaN || !amount) return;
    return Number(amount).toFixed(2);
  };

  return (
    <div className="h-full bg-white border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-zinc-300 transition-colors">
      {/* Cabecera de la tarjeta */}
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-bold text-zinc-600">
          {title}
        </span>
      </div>

      {/* Bloque del Monto y Descripción */}
      <div className="mt-2">
        <div className="flex md:flex-col justify-between gap-1">
          <h4
            className={`md:text-2xl font-black tracking-tight text-emerald-600`}
          >
            USD Bs {parseAmount(amountUsd)}
          </h4>

          <h4 className="md:text-2xl font-black text-amber-600 ">
            EUR Bs {parseAmount(amountEu)}
          </h4>
        </div>

        {desc && (
          <span className={`text-xs font-semibold mt-1 block text-zinc-400`}>
            {desc}
          </span>
        )}
      </div>
    </div>
  );
}
