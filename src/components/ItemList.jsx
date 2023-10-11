import { useEffect, useState } from "react";
import Item from "../components/Item";

export const ItemList = () => {


  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([
    "faber-castell",
    "artesco",
    "layconsa",
    "playdoh",
    "otros",
  ]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(150);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "libreriagigis@gmail.com";
        const password = "Administrador.123";
        const basicAuthHeader = "Basic " + btoa(username + ":" + password);

        const response = await fetch(
          "http://localhost:8080/libreriagigis/api/productos",
          {
            headers: {
              Authorization: basicAuthHeader,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setProductos(data);
        setProductosFiltrados(data);
        setLoading(false); // Finaliza la carga cuando los datos se reciben correctamente
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Finaliza la carga también si hay un error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Realizar el filtrado por nombre cuando el estado de 'busqueda' cambia
    const productosFiltradosPorNombre = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Realizar el filtrado por marca, precio y stock cuando los estados de 'marcasSeleccionadas', 'precioMinimo', 'precioMaximo' o 'productos' cambian
    if (marcasSeleccionadas.length === 0) {
      // Si no hay marcas seleccionadas, no mostrar ningún producto
      setProductosFiltrados([]);
    } else {
      // Si hay marcas seleccionadas, filtrar los productos por nombre, marca, precio y stock
      const productosFiltradosPorMarcaPrecioYStock =
        productosFiltradosPorNombre.filter(
          (producto) =>
            marcasSeleccionadas.includes(producto.marca.nombre.toLowerCase()) &&
            producto.precio >= precioMinimo &&
            producto.precio <= precioMaximo &&
            producto.stock >= 1 // Condición para el stock (mayor o igual a 1)
        );
      setProductosFiltrados(productosFiltradosPorMarcaPrecioYStock);
    }
  }, [busqueda, marcasSeleccionadas, precioMinimo, precioMaximo, productos]);

  function handleMarcaSeleccionada(e) {
    const marcaSeleccionada = e.target.value;
    if (e.target.checked) {
      // Si el checkbox se ha seleccionado, agregar la marca a la lista de marcas seleccionadas
      setMarcasSeleccionadas((prevMarcas) => [
        ...prevMarcas,
        marcaSeleccionada,
      ]);
    } else {
      // Si el checkbox se ha deseleccionado, eliminar la marca de la lista de marcas seleccionadas
      setMarcasSeleccionadas((prevMarcas) =>
        prevMarcas.filter((marca) => marca !== marcaSeleccionada)
      );
    }
  }

  function handlePrecioMinimoChange(e) {
    setPrecioMinimo(Number(e.target.value));
  }

  function handlePrecioMaximoChange(e) {
    setPrecioMaximo(Number(e.target.value));
  }

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-12 col-md-12 col-sm-12 mt-5 mb-5">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  {/*Filtrar por nombre*/}
                  <td>
                    <div>
                      <h5>Nombre</h5>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Buscar por nombre"
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/*Filtrar por Tipo de Combustible*/}
                  <td>
                    <div>
                      <h5>Marca</h5>
                      <div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="faber-castell"
                            checked={marcasSeleccionadas.includes(
                              "faber-castell"
                            )}
                            onChange={handleMarcaSeleccionada}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Faber-Castell
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="artesco"
                            checked={marcasSeleccionadas.includes("artesco")}
                            onChange={handleMarcaSeleccionada}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Artesco
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="layconsa"
                            checked={marcasSeleccionadas.includes("layconsa")}
                            onChange={handleMarcaSeleccionada}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Layconsa
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="playdoh"
                            checked={marcasSeleccionadas.includes("playdoh")}
                            onChange={handleMarcaSeleccionada}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Playdoh
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="otros"
                            checked={marcasSeleccionadas.includes("otros")}
                            onChange={handleMarcaSeleccionada}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Otros
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/*Filtrar por Precio*/}
                  <td>
                    <div>
                      <h5>Precio</h5>
                      <input
                        className="form-range"
                        type="range"
                        min="0"
                        max="150"
                        value={precioMinimo}
                        onChange={handlePrecioMinimoChange}
                      />
                      <input
                        className="form-range"
                        type="range"
                        min="0"
                        max="150"
                        value={precioMaximo}
                        onChange={handlePrecioMaximoChange}
                      />
                      <p className="titulo-titulo parrafo-filtro">
                        Rango de{" "}
                        <span className="span-span">S/. {precioMinimo}</span> a{" "}
                        <span className="span-span">S/. {precioMaximo}</span>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  {/*Contador de vehiculos disponibles segun el filtro*/}
                  <td>
                    <div>
                      <h5>
                        Se encontraron: {productosFiltrados.length} PRODUCTOS
                      </h5>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-xxl-9 col-xl-9 col-lg-12 col-md-12 col-sm-12">
            {loading ? ( // Muestra el mensaje de carga si 'loading' es true
              <div className="contenedor-no-productos">
                <div className="contenedor-hijo">
                  <h2>Cargando informacion...</h2>
                </div>
              </div>
            ) : productosFiltrados.length === 0 ? (
              // Muestra el mensaje de "No hay productos disponibles segun el filtro" si 'loading' es false y no hay productos filtrados
              <>
                <div className="contenedor-no-productos">
                  <div className="contenedor-hijo">
                    <h2>No hay productos disponibles según el filtro</h2>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="d-flex justify-content-center p-3">
                  Nuestro Productos
                </h1>
                <div className="items-list container">
                  {productosFiltrados.map((producto, idx) => {
                    return <Item key={producto.id} {...producto} />;
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
