import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Iniciar Sesión" },
    { name: "página de inicion de sesión", content: "Bienvenido a guimarbot" },
  ];
};

function register() {
  return (
    <div className="animate-fade-in-down">login</div>
  )
}

export default register