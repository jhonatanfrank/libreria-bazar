import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";

const Item = ({
  id,
  nombre,
  precio,
  foto,
  stock,
  marca,
  categoria,
  descripcion,
}) => {
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemFound = currItems.find((item) => item.id === id);
      if (isItemFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: Math.min(item.quantity + 1, stock), // Limitar la cantidad al stock del producto
            };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...currItems,
          { id, quantity: 1, precio, nombre, marca, categoria },
        ];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  return (
    <>
      <div className="marco">
        <div>
          {quantityPerItem >= stock && (
            <div class="alert alert-danger p-1" role="alert">
              <span className="d-flex justify-content-center">
                *No hay más stock*
              </span>
            </div>
          )}
        </div>
        <div className="item-box">
          <div>
            <h4 className="d-flex justify-content-center">{nombre}</h4>
          </div>
          <div className="mt-3 mb-3 contenedor-foto d-flex justify-content-center">
            <img className="foto" src={foto} alt={foto} />
          </div>
          <div className="item-price mb-4 d-flex justify-content-center">
            <h2>S/. {precio} </h2>
          </div>

          <div
            class="btn-group d-flex justify-content-center"
            role="group"
            aria-label="Basic example"
          >
            {quantityPerItem === 0 ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => addToCart()}
              >
                Agregar al carrito
              </button>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => addToCart()}
                disabled={quantityPerItem >= stock} // Deshabilitar el botón "+" si se alcanza el stock del producto
              >
                +
              </button>
            )}

            {quantityPerItem > 0 && (
              <div className="btn btn-sm btn-primary">{quantityPerItem}</div>
            )}

            {quantityPerItem > 0 && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => removeItem(id)}
              >
                -
              </button>
            )}
          </div>
          {/* Mensaje "No se puede agregar más porque hay stock" */}
          <button
            className="btn btn-sm btn-dark mt-1 col-12"
            onClick={handleOpenModal}
          >
            Ver producto
          </button>
        </div>
      </div>
      <div
        className={`modal ${showModal ? "d-block" : "d-none"} custom-modal`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{nombre}</h2>
            </div>
            <div className="modal-body">
              {/* Contenido del modal */}
              <div className="container">
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div>
                      <div>
                        <p>
                          <strong>Nombre:</strong> {nombre}
                        </p>
                        <p>
                          {" "}
                          <strong>Precio:</strong> {precio}
                        </p>
                        <p>
                          {" "}
                          <strong>Stock:</strong> {stock}
                        </p>
                        <p>
                          {" "}
                          <strong>Marca:</strong> {marca.nombre}
                        </p>
                        <p>
                          {" "}
                          <strong>Categoria:</strong> {categoria.nombre}
                        </p>
                        <p>
                          {" "}
                          <strong>Descripcion:</strong> Lorem ipsum, dolor sit
                          amet consectetur adipisicing elit. Debitis soluta et
                          ea ratione, officia ad fugit molestiae nihil ex
                          corrupti, iure, quaerat cumque eum facere adipisci ab
                          fuga reprehenderit deleniti!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div>
                      <img className="foto-modal" src={foto} alt={foto} />
                    </div>
                  </div>
                </div>
              </div>
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
    </>
  );
};

export default Item;
