import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colors from "../assets/ThemeColors";

export const successAlert = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      backgroundColor: colors.connectBlue,
    },
  });

export const errorAlert = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
