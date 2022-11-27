import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

import useProductos from "../../hooks/useProductos";

import Navbar from "../../components/Navbar";
import EditarProductos from "./EditarProductos";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import Select from 'react-select';


const DetalleProducto = ({producto}) => {


//   const provider = useContext(DataContext);
//   const adicionarProductoCarrito = (producto) => {
//     provider.setCarrito([...provider.carrito, producto]);       
// };

  const param = useParams();
  const [modalEditar, setModalEditar] = useState(false);

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

// const {op1,op2, op3 ,op4 ,op5 ,op6, op7 ,op8 ,op9, op10} = valorr
  const { _id, nombre, description, precio, stock, image } = productoState;
  //console.log(image);

  const options = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'},
    {value: '5', label: '5'},
  ]
 
    const [value, setValue] = useState(null);
    // const onDropdownChange = (value) => {
    //  setValue(value);
    //  console.log(value)
    // }
    

  // function ShowSelected() {
  //   const opt = document.getElementById('producto').value;
  //   console.log(opt)

  //   const combo = document.getElementById('producto');
  //   const selected = combo.options[combo.selectedIndex].text;
  //   console.log(selected);
  // } 
  // const ShowSelected = () => {
  //   const opt = document.getElementById('producto').value;
  //   console.log(opt)

  //   const combo = document.getElementById('producto');
  //   const selected = combo.options[combo.selectedIndex].text;
  //   console.log(selected);
  // }

  function ShowSelected(){
    let opt = document.getElementById('producto');
    let optFinal = opt.value;
    document.getElementById('mostrarOpt').innerHTML = `${optFinal * precio}`
    
  }
 

  return (
    <>
      <Navbar texto="Productos" ruta="" />
      <div className="main-container-details">
        {eliminado && <Navigate to="/productos" />}
        <h1 className="font-bold text-6xl title-details uppercase text-center w-full mx-auto mb-4 break-words mt-24">
          shopping <span className="text-sky-700">Cart</span>
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
            {/* <h3 className="title-description">Description</h3> */}
            {/* <p className="text-xl mb-9">{description}</p> */}
            <div className="flex justify-around mb-3">
              <p className="text-xl font-semibold">
                Precio : $<span className="font-normal">{precio}</span>
              </p>
              
              <p className="text-xl font-semibold">
                <div className="">

                </div>
                {/* <Select 
                  value={value}
                  options={options}
                  onChange={onDropdownChange}
                  
                /> */}

                <select id="producto" name="producto"  onchange={ShowSelected}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </p>
                <div className="text-xl font-semibold">precio total
                <p id="mostrarOpt"></p>
                </div>
                
              {/* <p className="text-xl font-semibold">
                Total: $<span className="font-normal">{precio}</span>
              </p> */}

            </div>
            <div className="flex container-btn-details justify-center gap-4 mt-12 mb-4 flex-wrap">
              <button
                className="bg-blue-700 text-white btn-edit p-2 text-xl uppercase rounded-md font-semibold hover:bg-blue-600 transition-colors w-full md:w-72 lg:w-80"
                onClick={(e) => setModalEditar(true)}
              >
            
                x
              </button>
              {/* <NavLink to={`carrito-compra/${_id}`}> */}
                <button
                    onClick={() => {adicionarProductoCarrito(producto) }}
                    type="button"
                    className="bg-sky-500 text-white btn-agg-cart p-2 uppercase font-medium w-full hover:bg-sky-700 transition-colors"
                >
                    Pagar
                </button> 
              {/* </NavLink>  */}
              {/* <button
                className="bg-red-700 text-white btn-delete p-2 text-xl uppercase rounded-md font-semibold hover:bg-red-600 transition-colors w-full md:w-72 lg:w-80"
                onClick={handelClick}
              >
                Eliminar
              </button> */}
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
