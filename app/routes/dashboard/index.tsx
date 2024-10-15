import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {title: "Dashboard | Guimarbot administrativo"}
    ];
}

function index() {
  return (
    <div>este es el dashbaord</div>
  )
}

export default index