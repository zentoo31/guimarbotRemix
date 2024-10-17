import { MetaFunction } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
      {title: "Gestor de usuarios | Guimarbot administrativo"}
  ]
}


function index() {
  return (
    <div className="w-full animate-fade-in-down">
        Este es el gestor de usuarios
    </div>
  )
}

export default index