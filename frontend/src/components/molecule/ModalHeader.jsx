import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/atoms/Icon";

export default function ModalHeader({ title, onClose }) {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight dark:text-zinc-100">
        {title}
      </h3>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-600 hover:text-slate-700 hover:dark:text-zinc-700 hover:bg-zinc-100 hover:dark:bg-zinc-800 transition-colors cursor-pointer"
        aria-label="Cerrar modal"
      >
        <Icon icon={faXmark} className="text-xl" />
      </button>
    </div>
  );
}
