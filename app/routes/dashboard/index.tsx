import { User, DateInput } from "@nextui-org/react";
import { LoaderFunction } from "@remix-run/node";
import SpinnerX from "~/ui-components/spinner";
import { Link, MetaFunction, Outlet, redirect, useNavigate } from "@remix-run/react"
import { Admin } from "~/models/admin";
import { useEffect, useState } from "react";
import { HiChartPie, HiMail, HiUsers, HiInbox, HiBookOpen, HiDocumentDuplicate, HiKey, HiChartBar } from "react-icons/hi";
import {parseAbsoluteToLocal} from "@internationalized/date";
import { AuthService } from "~/services/auth.service";
import { AdminInfoService } from "~/services/admin.info.service";

export const meta: MetaFunction = () => {
    return [
        {title: "Dashboard | Guimarbot administrativo"}
    ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  
  if (url.pathname === "/dashboard") {
    return redirect("/dashboard/default");
  }
  return null;
};

function Index() {
  const [admin, setAdmin] = useState<Admin | null>(null); 
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authService = new AuthService();
      const authStatus = await authService.isAuth();
      setIsAuth(authStatus);

      if (!authStatus) {
        navigate("/login"); 
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    const getAdminInfo = async () => {
      const adminInfoService = new AdminInfoService();
      const adminInfo = await adminInfoService.getAdminHeaderInfo();
      setAdmin(adminInfo);  
      console.log(adminInfo);
    };

    getAdminInfo();
  }, []);  

  if (isAuth === null) {
    return <SpinnerX/>;
  }

  const logout = async () => {
    const authService = new AuthService();
    const logoutStatus =  await authService.logout();
    console.log(logoutStatus);
    navigate("/login");
  };

 
 

  return (
    <div className="animate-fade-in-up">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
          <Link to="/" className="flex ms-2 md:me-24">
            <img
              src="/favicon.ico"
              className="h-8 me-3"
              alt="Guimarbot Logo"
            />
            <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white mr-1">
              Guimarbot:
            </span>
            <span className="self-center text-xl font-normal sm:text-2xl whitespace-nowrap dark:text-white">Administrativo</span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <h6 className="text-sm">Ultima sesión:</h6>
            <DateInput
              isReadOnly
              defaultValue={parseAbsoluteToLocal("2024-10-07T07:45:00Z")}
              labelPlacement="outside"
              />
          </div>
          <div className="flex items-center ms-3">
            <div>
            <User   
              name={admin?.first_name + " " + admin?.last_name}
              description={admin?.role}
              avatarProps={{
                src:admin?.profile_picture
              }} />
            </div>
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm text-gray-900 dark:text-white"
                  role="none"
                >
                  Neil Sims
                </p>
                <p
                  className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Resumen
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <Link
                    to="/dashboard/scholarship"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Gestor de becas
                  </Link>
                </li>
                <li>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col space-y-2">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/dashboard/default" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <HiChartPie className="w-6 h-6" fillOpacity={0.5}/>
              <span className="ms-3">Resumen</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/messaging" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <HiMail className="w-6 h-6" fillOpacity={0.5}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Mensajería</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiUsers className="w-6 h-6" fillOpacity={0.5}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Gestor de usuarios</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/inbox"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiInbox className="w-6 h-6" fillOpacity={0.5}/>
              <span className="flex-1 ms-3 whitespace-nowrap">Bandeja de entrada</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/subjects"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <HiBookOpen className = "w-6 h-6" fillOpacity={0.5} />
              <span className="flex-1 ms-3 whitespace-nowrap">Gestor de cursos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/scholarship"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <HiDocumentDuplicate className = "w-6 h-6" fillOpacity={0.5} />
              <span className="flex-1 ms-3 whitespace-nowrap">Gestor de becas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/charts"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <HiChartBar className = "w-6 h-6" fillOpacity={0.5} />
              <span className="flex-1 ms-3 whitespace-nowrap">Gráficos</span>
            </Link>
          </li>
        </ul>
       { admin?.role === "superadmin" &&(
         <ul  className="space-y-2 font-medium border-t-2 border-gray-200 dark:border-gray-700 pt-2">
         <li>
             <Link
               to="/dashboard/manage-admins"
               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
             >
             <HiKey className = "w-6 h-6" fillOpacity={0.5} />
               <span className="flex-1 ms-3 whitespace-nowrap">Gestor de admins</span>
             </Link>
           </li>
         </ul>
       )}
      </div>
      <ul className="font-medium space-y-2">
      <li>
          <button
            className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white bg-red-700 hover:bg-red-500 dark:hover:bg-red-500 group"
            onClick={logout}
          >  
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
              />
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
    <div className="p-4 sm:ml-64 h-full">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
          <Outlet/>
      </div>
    </div>
  </div>
  )
}

export default Index

