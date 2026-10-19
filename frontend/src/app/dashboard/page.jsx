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
import Icon from "@/components/atoms/Icon";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { usuario, cargando, cerrarSesion } = useSesion();
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

  const saludo = obtenerSaludo();

  const handleLogout = () => {
    if (typeof cerrarSesion === "function") {
      cerrarSesion();
    }
    router.push("/login");
  };

  function obtenerSaludo() {
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 12) {
      return "Buenos días";
    } else if (hora >= 12 && hora < 19) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  }

  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-amber-500 to-green-500 bg-clip-text text-transparent">
            {saludo},{" "}
            <span className="text-zinc-600 dark:text-zinc-200">
              {usuario?.name || "Inicia Sesion"}
            </span>
          </h1>
          <p className="text-sm text-zinc-400 font-semibold capitalize">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="space-x-9 items-center flex">
          <Link href={"/dashboard/setting"}>
            <Icon
              icon={faGear}
              className="text-2xl text-zinc-500 dark:text-orange-400 hover:text-zinc-700 hover:dark:text-orange-500"
            />
          </Link>
          <button title={"Salir"} onClick={handleLogout}>
            <Icon
              icon={faSignOut}
              className="text-2xl text-zinc-500 dark:text-zinc-300 cursor-pointer hover:text-zinc-700 hover:dark:text-zinc-500 "
            />
          </button>
        </div>
      </header>
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
    </section>
  );
}
