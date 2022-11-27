import {createContext, useState, useEffect} from "react"

export const DataContext = createContext();

export const DataProvider = (props) => {

    const [carritoCompras, setCarrito] = useState ([]);

    useEffect(() => {
        setCarrito(carritoCompras)
    }, [carritoCompras])

    const value = {
        carrito: carritoCompras,
        setCarritoo: setCarrito
    }

    return (
        <>
            <DataContext.Provider value={value}>
                {props.children}

            </DataContext.Provider>
        
        </>


    )
}
