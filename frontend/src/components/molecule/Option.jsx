import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../atoms/Icon";

export default function Option({ opctions = [], titleModel }) {
  return (
    <div className="flex flex-col gap-2">
      {titleModel && (
        <h3 className="text-xs uppercase font-semibold text-zinc-400 dark:text-zinc-500 px-1">
          {titleModel}
        </h3>
      )}
      {opctions.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          className="w-full flex items-center bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 justify-between transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Icon
              icon={option.icon}
              className={`text-xl ${option.classIcon}`}
            />
            <div>
              <h2 className="dark:text-zinc-200 font-bold text-sm">
                {option.title}
              </h2>
              <span className="text-xs text-zinc-400">{option.des}</span>
            </div>
          </div>

          <Icon
            icon={faChevronRight}
            className="text-base text-zinc-400 dark:text-zinc-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
          />
        </button>
      ))}
    </div>
  );
}
