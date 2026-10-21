"use client";
import { getUser } from "@/service/user/getUser";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/atoms/Icon";
import {
  faChevronLeft,
  faEdit,
  faLock,
  faUser,
  faShieldAlt,
  faPalette,
  faTags,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/atoms/Button";
import Option from "@/components/molecule/Option";
import Modal from "@/components/organisms/Modal";

export default function setting() {
  const [dataUser, setDataUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getUser().then((res) => setDataUser(res));
    };
    getData();
  }, []);

  const formattedDate = dataUser?.createdAt
    ? new Date(dataUser.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha no disponible";

  const formattedUpdate = dataUser?.updatedAt
    ? new Date(dataUser.updatedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No disponible";

  const getInitials = (name = "", lastName = "") => {
    const firstInitial = name.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}` || "U";
  };

  const optionList = [
    {
      title: "Categorías",
      des: "Hogar, salud, servicios básicos",
      icon: faTags,
      classIcon: "text-red-400 bg-red-500/30 p-2 rounded-full",
      onClick: () => setActiveModal("Categorías"),
    },
    {
      title: "Seguridad y privacidad",
      des: "Contraseña, métodos de acceso, terminos y condiciones",
      icon: faLock,
      classIcon: "text-emerald-400 bg-emerald-500/30 p-2 rounded-full",
      onClick: () => setActiveModal("Seguridad"),
    },
    {
      title: "Apariencia",
      des: "Personaliza el tema visual",
      icon: faPalette,
      classIcon: "text-purple-400 bg-purple-500/30 p-2 rounded-full",
      onClick: () => setActiveModal("Apariencia"),
    },
  ];

  return (
    <div className="space-y-5">
      <Link href={"/dashboard"}>
        <Icon icon={faChevronLeft} className="text-2xl text-zinc-400" />
      </Link>
      <div
        className="flex items-center gap-4 justify-between rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 mt-5 hover:dark:bg-zinc-700/50 cursor-pointer group"
        onClick={() => setActiveModal("Cuenta")}
      >
        <div className="flex gap-3 items-center">
          {/* Avatar o Iniciales */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 text-lg">
            {dataUser?.image ? (
              <img
                src={dataUser.image}
                alt={`${dataUser?.name || "Usuario"}`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(dataUser?.name, dataUser?.lastName)
            )}
          </div>

          {/* Nombre y Apellido */}
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {dataUser?.name ?? "Sin nombre"} {dataUser?.lastName ?? ""}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {dataUser?.role ?? "Usuario"}
            </p>
          </div>
        </div>

        {/* Lista de detalles */}
        {/* <div className="w-full space-y-2 rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-900/50">
          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-500 dark:text-zinc-400">Cuenta:</span>
            <input
              className={`font-medium text-zinc-800  rounded-lg p-1 dark:text-zinc-200 truncate text-end ${edit ? " border dark:border-zinc-500 border-zinc-300" : "outline-none"}`}
              readOnly={!edit}
              value={dataUser?.email ?? "No especificado"}
            />
          </div>

          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-500 dark:text-zinc-400">Registro:</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {formattedDate}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-zinc-500 dark:text-zinc-400">
              Actualizado:
            </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {formattedUpdate}
            </span>
          </div>
        </div> */}
        <Icon
          icon={faChevronRight}
          className="text-2xl dark:text-zinc-500  group-hover:translate-x-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all"
        />
      </div>
      <Option opctions={optionList} titleModel="Basico" />
      <Modal
        isOpen={activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal}
      >
        <p className="text-2xl dark:text-zinc-200">
          Pronto disfrutarás de la sección de <strong>{activeModal}</strong> en
          el sistema.
        </p>
      </Modal>
    </div>
  );
}
