import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definindo os tipos aceitos para o tipo de toast
type ToastType = "success" | "error" | "warn" | "info" | "default";

export const showToast = (message: string, type: ToastType = "default"): void => {
  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
