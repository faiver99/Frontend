import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const Navbar = ({ texto, ruta, id, perfil, cart }) => {

  const provider = useContext(DataContext);

  const [cantidad, setCantidad] = useState(provider.carrito.length);

  useEffect(() => {
    setCantidad(provider.carrito.length)
  });

  const { cerrarSesion } = useAuth();
  const [ver, setVer] = useState(false);
  const mostrarBarra = (n) => (ver ? setVer(false) : setVer(true));
  
  return (
    <nav className="shadow bg-slate-100 mb-5 flex fixed z-10 w-full top-0">
      <div className="navbar">
        <h1 className="title-navbar">Neo<span className="color-title-navbar">Devs</span></h1>
        <input
          type="search"
          placeholder="Encuentra automoviles, computadores y mas..."
          className="my-3 p-3 h-10 rounded-lg w-1/2 border-2"
        />
        <div className="flex gap-3">

          {!perfil && (
            <button type="button" className="hover:scale-110 transition-all">
              <Link
                to={`/perfil`}
                className="text-black p-2 w-full flex cursor-pointer font-medium hover:border-b-blue-500 hover:border-b-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </button>
          )}
          <button
            type="button"
            className="hover:scale-110 transition-all hover:border-b-2 hover:border-b-blue-500"
          >
            <Link
              to={`/productos/${ruta}`}
              className="uppercase text-black p-2 w-full cursor-pointer font-medium transition-all"
            >
              {texto}
            </Link>
          </button>
          <button type="button" >
              <Link
              to={`/productos/carrito-compra/${id}`}
              className="btn-cart">
                CART<span className="count-shopping-cart">{cantidad}</span>
              </Link>
            </button>
          <button
            type="button"
            className="bg-sky-700 text-white logout rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors"
          >
            <Link 
              to={"/"} 
              className="p-2 text-center w-full flex"
              onClick={cerrarSesion}
            >
              Logout
            </Link>
          </button>
        </div>
      </div>
      {/* <AsideVenta verAside={asideVentas} setAsideVentas={setAsideVentas}/> */}
    </nav>
  );
};
export default Navbar;
