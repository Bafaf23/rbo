"use client";
import BalanceHeroCard from "@/components/organisms/BalanceHeroCard";
import MonthlyCashFlowCard from "@/components/organisms/MonthlyCashFlowCard";
import StatCard from "@/components/organisms/StatCard";
import TasasBCV from "@/components/organisms/TasasBCV";
import Movements from "@/components/organisms/Movements";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSesion } from "@/context/SesionContext";
import { bsPrecio, bsPrecioEu } from "@/service/dolarApi/getBs";
import { balance, trans } from "@/service/transaction/balance";

export default function DashboardPage() {
  const router = useRouter();
  const { usuario, cargando } = useSesion();
  const [tasaDolar, setTasaDolar] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [tasaEu, setTasaEu] = useState("");
  const [balances, setBalances] = useState("");

  useEffect(() => {
    if (!cargando && !usuario) {
      router.push("/login");
    }
  }, [cargando, router, usuario]);

  useEffect(() => {
    async function obtenerTasa() {
      const data = await bsPrecio();
      const dataEu = await bsPrecioEu();
      if (data && dataEu) {
        setTasaDolar(data);
        setTasaEu(dataEu);
      }
    }

    async function otenerbalance() {
      const data = await balance();
      const dataTrans = await trans();
      if (data && dataTrans) {
        setBalances(data.data);
        setTransaction(dataTrans);
      }
    }

    if (usuario) {
      obtenerTasa();
      otenerbalance();
    }
  }, [usuario]);

  if (cargando || !usuario) {
    return (
      <div className="absolute w-full h-full top-0 right-0 backdrop-blur-2xl bg-black/10 flex items-center justify-center">
        <p className="text-zinc-600 text-lg font-semibold animate-pulse">
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="md:col-span-2 md:row-span-2">
        <BalanceHeroCard
          tasaDolar={tasaDolar.promedio}
          ingresos={balances?.totales?.ingresos || 0}
          gastos={balances?.totales?.egreso || 0}
          deudas={balances?.totales?.deudas || 0}
          balanceUsd={balances?.totales?.balanceTotal || 0}
        />
      </div>

      <div className="md:col-span-1">
        <StatCard
          title="50% - Necesidades"
          ingreso={balances?.totales?.ingresos}
          porcentaje={50}
          amountBs={tasaDolar.promedio}
          desc="Pagos obligatorios requeridos para tu día a día."
          className={"text-green-600"}
        />
      </div>

      <div className="md:col-span-1">
        <StatCard
          title="30% - Deseos"
          porcentaje={30}
          ingreso={balances?.totales?.ingresos}
          amountBs={tasaDolar.promedio}
          desc="Gastos opcionales que mejoran tu calidad de vida."
          className={"text-rose-700"}
        />
      </div>

      <div className="md:col-span-1">
        <StatCard
          title="20% - Ahorro"
          porcentaje={20}
          ingreso={balances?.totales?.ingresos}
          amountBs={tasaDolar.promedio}
          desc="Dinero destinado a tu red de seguridad y patrimonio."
          className={"text-amber-500"}
        />
      </div>

      <div className="md:col-span-1">
        <TasasBCV
          title="Tasas del BCV"
          amountUsd={tasaDolar?.promedio}
          amountEu={tasaEu?.promedio}
          desc="Precio del Dolar y Euro del BCV."
        />
      </div>

      <div className="md:col-span-2">
        <Movements movements={balances?.transacciones} />
      </div>
      <div className="md:col-span-2">
        <MonthlyCashFlowCard data={transaction} />
      </div>
    </div>
  );
}
