import { HiXCircle, HiCheck } from "react-icons/hi";
import ReactDOM from "react-dom";
import { Toast } from "flowbite-react";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  success: boolean;
};

function CustomToast({ message, success }: ToastProps) {
  useEffect(()=> {
    const sound = new Audio(success ? "/audio/success_sound.mp3" : "/audio/unsucess_sound.mp3");
    sound.volume = 0.1;
    sound.play();
  }, [success]);

  const toastContent =  (
    <div className="absolute bottom-5 right-5 z-[9999]" style={{position: "fixed"}}>
      <Toast className="animate-fade-in-up">
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            success
              ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
              : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
          }`}
        >
          {success ? <HiCheck className="h-5 w-5" /> : <HiXCircle className="h-5 w-5" />}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
  return ReactDOM.createPortal(toastContent, document.body);
}

export default CustomToast;
