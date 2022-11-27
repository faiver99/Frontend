import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import useProductos from "../../hooks/useProductos";

import Navbar from "../../components/Navbar";
import EditarProductos from "./EditarProductos";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

const DetalleProducto = ({producto}) => {
  


  const param = useParams();
  const [modalEditar, setModalEditar] = useState(false);
  const addCart = (id) => {
    provider.setCarritoo([...provider.carrito, id]);
}



  const {
    obtenerProducto,
    productoState,
    deleteProducto,
    eliminado,
    setEliminado,
  } = useProductos();

  useEffect(() => {
    obtenerProducto(param.id);
  }, []);

  const handelClick = async (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "btn bg-red-600 rounded-md text-white text-center p-2 font-bold mx-2",
        cancelButton:
          "btn bg-green-600 rounded-md text-white text-center p-2 font-bold mx-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "Estas accion no se podra revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteProducto(param.id);
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "El Producto se elimino",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "No se elimino el Producto!!",
            "error"
          );
        }
      });
  };
  
  const { _id, nombre, description, precio, stock, image } = productoState;

  
  const provider = useContext(DataContext);
  const adicionarProductoCarrito = (producto) => {
    // console.log('agregado')
    provider.setCarritoo([...provider.carrito, producto]);  
    
    // console.log(stocks)  
};

// const sumaStock = () =>{
//   return stock -11
// }
  //console.log(image);
  return (
    <>
      <Navbar texto="Productos" ruta="" />
      <div className="main-container-details">
        {eliminado && <Navigate to="/productos" />}
        <h1 className="font-bold text-6xl title-details uppercase text-center w-full mx-auto mb-4 break-words mt-24">
          Product <span className="text-sky-700">Description</span>
        </h1>
        <div className="container-deatails ">
          <div className="img-details">
            <img
              src={image ? `${image.url}` : ""}
              alt={nombre}
              className="h-56 w-96 border-2"
            />
          </div>
          <div className="details-product">
            <h1 className="text-4xl font-bold capitalize mb-9">{nombre}</h1>
            <h3 className="title-description">Description</h3>
            <p className="text-xl mb-9">{description}</p>
            <div className="flex justify-around mb-3">
              <p className="text-xl font-semibold">
                Precio : $<span className="font-normal">{precio}</span>
              </p>
              <p className="text-xl font-semibold">
                Cantidad : <span className="font-normal">{stock}</span>
              </p>
            </div>
            <div className="flex container-btn-details justify-center gap-4 mt-12 mb-4 flex-wrap">
              <button
                className="bg-blue-700 text-white btn-edit p-2 text-xl uppercase rounded-md font-semibold hover:bg-blue-600 transition-colors w-full md:w-72 lg:w-80"
                onClick={(e) => setModalEditar(true)}
              >
            
                Editar
              </button>
              {/* <NavLink to={`carrito-compra/${_id}`}> */}
                <button
                    onClick={() => addCart(producto)}
                    type="button"
                    className="bg-sky-500 text-white btn-agg-cart p-2 uppercase font-medium w-full hover:bg-sky-700 transition-colors"
                >
                    Añadir al Carritoo
                </button> 
              {/* </NavLink>  */}
              <button
                className="bg-red-700 text-white btn-delete p-2 text-xl uppercase rounded-md font-semibold hover:bg-red-600 transition-colors w-full md:w-72 lg:w-80"
                onClick={handelClick}
              >
                Eliminar
              </button>
            </div>
          </div>
          
          
          
        </div>
      </div>
      {modalEditar && (
        <EditarProductos id={param.id} setModalEditar={setModalEditar} />
      )}
    </>
  );
};
export default DetalleProducto;
