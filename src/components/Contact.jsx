import React, { useState } from "react";

const Contact = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [enviado, setEnviado] = useState(false); // Estado para controlar el mensaje "Datos enviados"

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crear el objeto con los datos del formulario
    const alquilerData = {
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      celular: celular,
      comentarios: comentarios,
      estadoatencion: {
        id: 1,
      },
    };

    // Realizar la solicitud POST a la API de contacto
    const username = "libreriagigis@gmail.com";
    const password = "Administrador.123";
    const basicAuthHeader = "Basic " + btoa(username + ":" + password);

    fetch("http://localhost:8080/libreriagigis/api/contactanos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuthHeader, // Agregamos las credenciales en el encabezado
      },
      body: JSON.stringify(alquilerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta de la solicitud POST si es necesario
        console.log(data);

        // Reseteamos los campos del formulario y mostramos el mensaje de "Datos enviados"
        setNombres("");
        setApellidos("");
        setEmail("");
        setCelular("");
        setComentarios("");
        setEnviado(true);

        // Después de 3 segundos, ocultamos el mensaje "Datos enviados"
        setTimeout(() => {
          setEnviado(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <>
      <div className="container mt-5">
        <h4>Contáctanos</h4>
        <p className="titulo-titulo">
          Si desea solicitar información, complete y envíe el formulario a
          continuación.
        </p>
        {enviado && (
          <div className="alert alert-success" role="alert">
            Datos enviados
          </div>
        )}
        <form className="needs-validation row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombres"
              name="nombres"
              required
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos"
              name="apellidos"
              required
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              placeholder="+51 976 407 806"
              name="celular"
              required
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Añade algo más a tu solicitud:</label>
            <textarea
              name="comentarios"
              className="form-control"
              rows="6"
              required
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            ></textarea>
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-dark btn-sm p-2">
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
