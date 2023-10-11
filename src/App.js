import "./App.css";
import { ItemList } from "./components/ItemList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import "./Bootswatch/bootstrap.css";
import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Contact from "./components/Contact";
import Pagoexitoso from "./components/Pagoexitoso";
import Error from "./components/Error";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<ItemList />} />
            <Route path="/contactanos" element={<Contact />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/pagoexitoso" element={<Pagoexitoso />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
