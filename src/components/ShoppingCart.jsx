import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import { CLIENT_ID } from "../config/config";
import { Redirect } from "react-router-dom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const ShoppingCart = () => {
  const [numeroAleatorio, setNumeroAleatorio] = useState(null);

  /* PAYPAL INICIO */
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  /* PAYPAL FIN */

  const [cart, setCart] = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  // Función para abrir el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.precio,
    0
  );
  // Estado para almacenar la opción seleccionada del método de entrega
  const [metodoEntrega, setMetodoEntrega] = useState("");

  // Función para manejar el evento onChange del select
  const handleMetodoEntregaChange = (event) => {
    const selectedOption = event.target.value;
    setMetodoEntrega(selectedOption);

    if (selectedOption === "Recibirlo en casa") {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  };



  console.log(metodoEntrega);
  console.log(cart);

  /*PAYPAL INICIO*/

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      })
      .catch((error) => {
        console.log("Error al crear orden: ", error);
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      setShow(false);
    });
  };

  // Función para manejar errores en el proceso de pago
  const onError = (error) => {
    setErrorMessage("An error occurred with your payment: " + error.message);
  };

  useEffect(() => {
    const restarStock = async () => {
      if (success) {
        alert("Payment successful!!");
        console.log("Order successful. Your order id is--", orderID);
        crearOrden();
        exportarPDF();

        // Redirigir al usuario a la página "pagoexitoso"
        setTimeout(() => {
          window.location.replace("/pagoexitoso");
        }, 2000);

        // Credenciales de autorización
        const username = "libreriagigis@gmail.com";
        const password = "Administrador.123";
        const basicAuthHeader = "Basic " + btoa(username + ":" + password);

        // Restar el stock en la API para cada producto en el carrito
        for (const item of cart) {
          try {
            const productId = item.id;
            const quantityToSubtract = item.quantity;

            // Realizar una solicitud GET para obtener el producto actual de la API
            const response = await fetch(
              `http://localhost:8080/libreriagigis/api/productos/${productId}`,
              {
                headers: {
                  Authorization: basicAuthHeader, // Agregamos las credenciales en el encabezado
                },
              }
            );
            const product = await response.json();

            // Calcular el nuevo stock restando la cantidad del carrito al stock actual del producto
            const newStock = product.stock - quantityToSubtract;

            // Realizar una solicitud PUT para actualizar el stock del producto en la API
            await fetch(
              `http://localhost:8080/libreriagigis/api/productos/${productId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: basicAuthHeader, // Agregamos las credenciales en el encabezado
                },
                body: JSON.stringify({ ...product, stock: newStock }),
              }
            );
          } catch (error) {
            console.error("Error updating stock for product with ID", item.id);
            console.error(error);
          }
        }
      }
    };

    restarStock();
  }, [success, cart, orderID]);

  /*PAYPAL FIN*/

  console.log(cart);
  useEffect(() => {
    function generarNumeroAleatorio() {
      const min = 100000000; // Número mínimo de 9 dígitos (100,000,000)
      const max = 999999999; // Número máximo de 9 dígitos (999,999,999)
      const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
      return numeroAleatorio;
    }

    const numeroGenerado = generarNumeroAleatorio();
    setNumeroAleatorio(numeroGenerado);
  }, []);

  /*AGREGAR AL CARRITO */
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [direccionentrega, setDireccionentrega] = useState("");
  const [avretablo, setAvretablo] = useState("Av. Retablo 232");
  const [entrega, setEntrega] = useState("");
  const [estadocheck, setEstadocheck] = useState(false);

  const [comentarios, setComentarios] = useState("");
  const fechasolicitud = new Date();

  const obtenerNombres = (event) => {
    setNombres(event.target.value);
  };

  const obtenerApellidos = (event) => {
    setApellidos(event.target.value);
  };

  const obtenerDni = (event) => {
    setDni(event.target.value);
  };

  const obtenerEmail = (event) => {
    setEmail(event.target.value);
  };

  const obtenerPais = (event) => {
    setPais(event.target.value);
  };

  const obtenerDepartamento = (event) => {
    setDepartamento(event.target.value);
  };

  const obtenerDistrito = (event) => {
    setDistrito(event.target.value);
  };

  const obtenerDireccion = (event) => {
    setDireccion(event.target.value);
  };

  const obtenerTelefono1 = (event) => {
    setTelefono1(event.target.value);
  };

  const obtenerTelefono2 = (event) => {
    setTelefono2(event.target.value);
  };

  const obtenerDireccionEntrega = (event) => {
    setDireccionentrega(event.target.value);
  };

  const obtenerAvretablo = (event) => {
    setAvretablo(event.target.value);
  };

  const obtenerComentarios = (event) => {
    setComentarios(event.target.value);
  };

  const crearOrden = () => {
    const orden = {
      codigo: numeroAleatorio,
      nombres: nombres,
      apellidos: apellidos,
      dni: dni,
      email: email,
      pais: pais,
      departamento: departamento,
      direccion: direccion,
      distrito: distrito,
      telefono1: telefono1,
      telefono2: telefono2,
      metodoentrega: entrega,
      comentarios: comentarios,
      fechasolicitud: fechasolicitud.toISOString,
    };

    // Realizar la solicitud POST para crear la orden
    const username = "libreriagigis@gmail.com";
    const password = "Administrador.123";
    const basicAuthHeader = "Basic " + btoa(username + ":" + password);

    // Realizar la solicitud POST para crear la orden
    fetch("http://localhost:8080/libreriagigis/api/orden/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuthHeader, // Agregamos las credenciales en el encabezado
      },
      body: JSON.stringify(orden),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((ordenCreada) => {
        console.log("Orden creada exitosamente:", ordenCreada);

        // Una vez creada la orden, obtener el id de la orden creada
        const idOrdenCreada = ordenCreada.id;

        cart.forEach((item) => {
          const orden_producto = {
            orden: {
              id: idOrdenCreada,
            },
            producto: {
              id: item.id,
            },
            cantidad: item.quantity,
          };

          // Realizar la solicitud POST para agregar el objeto orden_producto
          fetch("http://localhost:8080/libreriagigis/api/ordenproducto/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: basicAuthHeader, // Agregamos las credenciales en el encabezado
            },
            body: JSON.stringify(orden_producto),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Orden_Producto agregado exitosamente:", data);
            })
            .catch((error) => {
              console.error("Error al agregar Orden_Producto:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error al crear la orden:", error);
      });
  };

  useEffect(() => {
    if (metodoEntrega === "Recibirlo en casa") {
      setEntrega(direccionentrega);
    } else {
      setDireccionentrega("");
      setEntrega(avretablo);
    }
  }, [metodoEntrega, direccionentrega, avretablo]); // El arreglo de dependencias indica que el efecto depende del valor de "metodoEntrega"

  //console.log("Recibido en : " + entrega);
  cart.map((producto) => {
    console.log("Nombre:", producto.nombre);
    console.log("Precio:", producto.precio);
    return null; // No es necesario devolver nada en el map
  });

  const exportarPDF = () => {
    const doc = new jsPDF();

    const texto = `
  CÓDIGO DE COMPRA: ${numeroAleatorio}

  DATOS DEL COMPRADOR:
  Nombre: ${nombres}
  Apellido: ${apellidos}
  Correo electrónico: ${email}
  País: ${pais}
  Distrito: ${distrito}
  Dirección: ${direccion}
  Teléfono: ${telefono1}
  Teléfono alternativo: ${telefono2}

  DATOS DE LOS PRODUCTOS:
  ${cart.map((producto) => {
    return `
  Nombre: ${producto.nombre}
  Precio: ${producto.precio}
  Cantidad: ${producto.quantity}
  Marca: ${producto.marca.nombre}
  Categoría: ${producto.categoria.nombre}  
  `;
  })}
  
  DATOS DE COMPRA:
  Precio total: S/. ${totalPrice}
  `;

    doc.text(texto, 10, 10);
    doc.save(
      "COMPRA " + numeroAleatorio + " " + nombres + " " + apellidos + ".pdf"
    );
  };

  useEffect(() => {
    if (
      nombres === "" ||
      apellidos === "" ||
      dni === "" ||
      email === "" ||
      pais === "" ||
      departamento === "" ||
      distrito === "" ||
      direccion === "" ||
      telefono1 === "" ||
      telefono2 === "" ||
      comentarios === "" ||
      entrega === "" ||
      !isCheckboxChecked
    ) {
      setEstadocheck(false);
    } else {
      setEstadocheck(true);
    }
  }, [
    isCheckboxChecked,
    nombres,
    apellidos,
    dni,
    email,
    pais,
    departamento,
    distrito,
    direccion,
    telefono1,
    telefono2,
    comentarios,
    entrega,
  ]); // El arreglo de dependencias indica que el efecto depende del valor de "metodoEntrega"

  console.log(estadocheck);

  return (
    <>
      {quantity === 0 ? (
        <>
          <div className="p-5">
            <div class="d-flex justify-content-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="green"
                class="bi bi-cart4"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <h1>¡El carrito está vacío!</h1>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <h3>
                Selecciona productos para agregar a tu carrito de compras.
              </h3>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <p>
                Sumérgete en nuestra tienda y encuentra todo lo que necesitas,{" "}
                <br />
                desde bolígrafos suaves y lápices de colores vibrantes hasta{" "}
                <br />
                carpetas elegantes y libretas de alta calidad. Nuestros
                productos <br />
                son perfectos para estudiantes, profesores, oficinistas y todos{" "}
                <br />
                aquellos que buscan tener herramientas prácticas y estilosas a
                su <br />
                alcance.
              </p>
            </div>
            <div class="d-flex justify-content-center mt-1">
              <Link to={"/productos"}>
                <input className="btn btn-success" value="VOLVER A PRODUCTOS" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <h2>Resumen de compra</h2>
            <div className="table-responsive">
              <table className="table table-striped mt-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Precio x unidad</th>
                    <th scope="col">Unidad</th>
                    <th scope="col">Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.nombre}</td>
                      <td>{item.marca.nombre}</td>
                      <td>S/. {item.precio}</td>
                      <td>{item.quantity}</td>
                      <td>S/. {item.quantity * item.precio}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="text-end">
                      Total:
                    </td>
                    <td>S/. {totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="container mt-5 mb-5">
            <h2>Formulario</h2>
            <form id="miFormulario">
              <div className="row">
                <div className="col-md-3">
                  <label>Nombres (*)</label>
                  <input
                    id="nombres"
                    type="text"
                    name="nombres"
                    className="form-control col-12"
                    value={nombres}
                    placeholder="Ingrese sus nombres"
                    onChange={obtenerNombres}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Apellidos (*)</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    value={apellidos}
                    placeholder="Ingrese sus apellidos"
                    onChange={obtenerApellidos}
                    required
                  />
                </div>{" "}
                <div className="col-md-3">
                  <label htmlFor="name">DNI o Carnet de extranjería (*)</label>
                  <input
                    type="number"
                    name="dni"
                    className="form-control input-number"
                    value={dni}
                    placeholder="Ingrese su DNI"
                    onChange={obtenerDni}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Email (*)</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    placeholder="Ingrese su Correo Electrónico"
                    onChange={obtenerEmail}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="name">Pais (*)</label>
                  <input
                    type="text"
                    name="pais"
                    className="form-control"
                    value={pais}
                    placeholder="Ingrese su país"
                    onChange={obtenerPais}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Departamento (*)</label>
                  <input
                    type="text"
                    name="departamento"
                    className="form-control"
                    value={departamento}
                    placeholder="Ingrese su departamento"
                    onChange={obtenerDepartamento}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Distrito *</label>
                  <input
                    type="text"
                    name="distrito"
                    className="form-control"
                    value={distrito}
                    placeholder="Ingrese su distrito"
                    onChange={obtenerDistrito}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="name">Direccion (*)</label>
                  <input
                    type="text"
                    name="direccion"
                    className="form-control"
                    value={direccion}
                    placeholder="Ingrese su dirección"
                    onChange={obtenerDireccion}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Telefono (*)</label>
                  <input
                    type="number"
                    name="telefono"
                    className="form-control input-number"
                    value={telefono1}
                    placeholder="Ingrese su telefono"
                    onChange={obtenerTelefono1}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Telefono alternativo (*)</label>
                  <input
                    type="text"
                    name="telefonoalternativo"
                    className="form-control input-number"
                    placeholder="Ingrese un número alternativo"
                    value={telefono2}
                    onChange={obtenerTelefono2}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="name">Metodo de entrega (*)</label>
                  <select
                    name="lugarrecojo"
                    className="form-control"
                    required
                    value={metodoEntrega} // Asignar el valor del estado al select
                    onChange={handleMetodoEntregaChange} // Manejar el evento onChange del select
                  >
                    <option value="Recoger presencialmente">
                      Recoger presencialmente
                    </option>
                    <option value="Recibirlo en casa">Recibirlo en casa</option>
                  </select>
                </div>
                {metodoEntrega === "Recibirlo en casa" ? (
                  <>
                    <div className="col-md-3">
                      <label htmlFor="direccion">Ingrese dirección: (*)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={direccionentrega}
                        onChange={obtenerDireccionEntrega}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-3">
                      <label htmlFor="direccion">Acercarse a: (*)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={avretablo}
                        disabled
                        required
                      />
                    </div>
                  </>
                )}
                <div className="col-md-12">
                  <label htmlFor="name">Comentario (*)</label>
                  <textarea
                    name="comentarios"
                    className="form-control"
                    rows="6"
                    onChange={obtenerComentarios}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  id="mi-checkbox"
                  className="form-check-input"
                  onChange={handleCheckboxChange}
                />
                <label onClick={handleOpenModal}>
                  Acepto que he leído los
                  <strong>&nbsp;Términos y Condiciones</strong>
                </label>
              </div>
            </form>
          </div>

          {/* Modal */}
          <div
            className={`modal ${showModal ? "d-block" : "d-none"} custom-modal`}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Términos y Condiciones</h5>
                </div>
                <div className="modal-body">
                  {/* Aquí puedes agregar el contenido de los términos y condiciones */}
                  {/* Por ejemplo: */}
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                  <p>Este es un ejemplo de términos y condiciones.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal 2*/}
          <div
            className={`modal ${showModal2 ? "d-block" : "d-none"} custom-modal`}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Términos y Condiciones</h5>
                </div>
                <div className="modal-body">
                  {/* Aquí puedes agregar el contenido de los términos y condiciones */}
                  {/* Por ejemplo: */}
                  <p>Este es un ejemplo de términos y condiciones.</p>                 
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal2}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {estadocheck ? (
            <>
              <div className="cart-container">
                <div>
                  <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                    <div>
                      <div className="wrapper">
                        <div className="product-info">
                          <div className="product-price-btn">
                            <div>Productos total: {quantity}</div>
                            <div>El precio total es: S/. {totalPrice}</div>
                            <br></br>
                            <button
                              className="btn btn-dark"
                              type="submit"
                              onClick={() => setShow(true)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      {show ? (
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={(error) => {
                            try {
                              onError(error);
                            } catch (error) {
                              // Si ocurre un error en la función onError, muestra tu alert personalizado
                              alert("esperaaaaaaa");
                            }
                          }}
                        />
                      ) : null}
                    </div>
                  </PayPalScriptProvider>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ShoppingCart;
