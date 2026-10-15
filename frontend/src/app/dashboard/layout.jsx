"use client";

import Icon from "@/components/atoms/Icon";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useSesion } from "@/context/SesionContext";
import { useRouter } from "next/navigation";

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

export default function DashboardLayout({ children }) {
  const saludo = obtenerSaludo();
  const router = useRouter();
  const { usuario, cerrarSesion } = useSesion();

  const handleLogout = () => {
    if (typeof cerrarSesion === "function") {
      cerrarSesion();
    }
    router.push("/login");
  };

  return (
    <div className="bg-zinc-100 text-slate-950 p-3">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-amber-500 to-green-500 bg-clip-text text-transparent">
              {saludo},{" "}
              <span className="text-zinc-600">
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
          <button title={"Salir"} onClick={handleLogout}>
            <Icon
              icon={faSignOut}
              className="text-2xl text-zinc-500 cursor-pointer hover:text-zinc-700"
            />
          </button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
