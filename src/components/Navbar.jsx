import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";

const Navbar = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} style={navStyles}>
            <a className="navbar-brand" href="#">
              Libreria GIGI´S
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} style={navStyles}>
                  <a className="nav-link" href="#">
                    Inicio
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/productos"} style={navStyles}>
                  <a className="nav-link" href="#">
                    Productos
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contactanos"} style={navStyles}>
                  <a className="nav-link" href="#">
                    Contactanos
                  </a>
                </Link>
              </li>
            </ul>
            <Link to={"/cart"} style={navStyles}>
              <span className="d-flex justify-content-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="black"
                    class="bi bi-bag-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </span>
                <span className="cart-count">
                  {quantity === 0 ? (
                    <>Añade algo al carrito</>
                  ) : (
                    <>{quantity}</>
                  )}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
