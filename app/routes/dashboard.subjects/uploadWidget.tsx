import { useEffect, useRef } from "react";

declare global {
    interface Window {
        cloudinary: {
            createUploadWidget: (
                options: object,
                callback: (error: Error | null, result: { event: string; info: { secure_url: string } } | null) => void
            ) => { open: () => void };
        };
    }
}


interface UploadWidgetProps {
    folder: string;
    preset: string;
    label: string;
    formats: string[];
    onUploadSuccess: (url: string) => void; 
}

function UploadWidget({ folder, preset, label, formats, onUploadSuccess }: UploadWidgetProps) {
    const widgetRef = useRef<{ open: () => void } | null>(null);

    useEffect(() => {
        if (window.cloudinary) {
            widgetRef.current = window.cloudinary.createUploadWidget(
                {
                    cloudName: "dmbry7maq",
                    uploadPreset: preset,
                    folder: folder,
                    sources: ['local', 'url', 'camera'],
                    multiple: false,
                    clientAllowedFormats: formats,
                    language: 'es',
                    text:{
                        es: {
                          "or": "o",
                          local: {
                            "browse": "Elegir archivo",
                            "dd_title_single": "Arrastra tu archivo de imagen aquí",
                          },
                          menu: {
                              "files": "Mis archivos",
                              "web": "Dirección web",
                              "camera": "Cámara",
                          },
                          camera: {
                            "capture": "Capturar",
                              "cancel": "Cancelar",
                              "take_pic": "Tomar foto",
                              "explanation": "Permite el acceso a tu cámara para tomar una foto y subirla a la nube.",
                              "camera_error": "Error al acceder a la cámara.",
                              "retry": "Reintentar",
                          },
                          url: {
                              "inner_title": "Pega la URL de la imagen",
                              "input_placeholder": "http://sitio.remoto.ejemplo/imagenes/imagen-remota.jpg"
                          },
                          crop: {
                              "title": "Recortar imagen",
                              "crop_btn": "Recortar",
                              "skip_btn": "Saltar",
                              "reset_btn": "Reiniciar"
                          }
                        }
                      }
                },
                (error, result) => {
                    if (error) {
                        console.error("Error en el widget:", error);
                    }
                    if (result && result.event === "success") {
                        const secureUrl = result.info.secure_url; // Obtener la secure_url del resultado
                        onUploadSuccess(secureUrl); // Llamar a la función callback con la secure_url
                    } 
                }
            );
        }
    }, []);

    return (
        <div className="w-full">
            <button
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onClick={() => widgetRef.current?.open()}
            >  
                <div className="flex flex-row items-center justify-center gap-5">
                    <svg
                                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                    </svg>
                    <p className=" text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">{label}</span> 
                    </p>
                </div>
            </button>
        </div>
    );
}

export default UploadWidget;
