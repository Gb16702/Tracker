import { toast } from "react-hot-toast";
import { Cross } from "./Icons/HeroIcons/Cross";
import { Check } from "./Icons/HeroIcons/Check";
import { Informations } from "./Icons/HeroIcons/Informations";

const Toast = ({ message, type, visible, variant, dark }, t) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full border border-zinc-800/[.8] ${
        dark
          ? "bg-zinc-900 shadow-[50px_0px_40px_rgba(255,70,85,.15)_inset]"
          : "bg-white"
      }  rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      onClick={(t) => toast.dismiss(t.id)}
    >
      <div className="flex-1 w-0 p-4 h-full">
        <div className="flex items-start h-full gap-x-1">
          <div className="flex-shrink-0 flex items-center justify-center min-h-full ">
            {variant === "error" ? (
              <Cross />
            ) : variant === "success" ? (
              <Check className="fill-teal-500" />
            ) : variant === "info" ? (
              <Informations />
            ) : (
              variant === "admin_success" && (
                <Check className="fill-vprimary " />
              )
            )}
          </div>
          <div className="ml-3 flex-1">
            <p
              className={`text-sm ${
                dark ? "text-zinc-100" : "text-zinc-900"
              } font-medium tracking-wide`}
            >
              {type}
            </p>
            <p
              className={` text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
