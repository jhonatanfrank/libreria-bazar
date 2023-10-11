import React from "react";
import { Link } from "react-router-dom";

const inicio = () => {
  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.shopify.com/s/files/1/0452/6925/4301/collections/banner_oficina_1896x800_9f4e3fa5-7fbe-464e-b113-853b553e4427.jpg?v=1634275030"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.cervantesvirtual.com/images/portales/biblioteca_menendez_pelayo/imagen_portada.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container-fluid">
        <section class="page-section" id="services">
          <div class="container">
            <div class="text-center">
              <h2 class="section-heading text-uppercase">¿Quienes somos?</h2>
              <h3 class="section-subheading text-muted">
                Enterate un poco mas de nosotros
              </h3>
            </div>
            <div class="row text-center">
              <div class="col-md-6">
                <span class="fa-stack fa-4x">
                  <i class="fas fa-circle fa-stack-2x text-primary"></i>
                  <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="my-3">En nuestros inicios...</h4>
                <p class="text-muted">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Eveniet illum eius ea, optio enim, voluptate consectetur nulla
                  adipisci temporibus totam aut quis iusto perspiciatis.
                  Delectus fuga maxime ipsam nulla reprehenderit. Voluptates
                  nobis reprehenderit quae? Iste voluptatibus cumque tempora hic
                  pariatur temporibus totam illo quam, nam, tempore rem. Facilis
                  fugit minus eum ratione, itaque aliquid quaerat. Quis omnis
                  quae corporis iure. Sed qui tempore sapiente eum corporis odit
                  veniam itaque perferendis debitis velit, adipisci voluptates
                  nisi, labore quo dolor aut molestias? Quis corrupti
                  accusantium fugit laboriosam quasi libero, cum veniam
                  cupiditate.
                </p>
                <div>
                  <button className="btn btn-sm btn-dark">
                    <Link className="nav-link" to="/productos">
                      Ver nuestros productos
                    </Link>
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <span class="fa-stack fa-4x">
                  <i class="fas fa-circle fa-stack-2x text-primary"></i>
                  <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                </span>
                <div className="d-flex justify-content-center mt-5">
                  <img
                    className="imagen-quienes-somos"
                    src="https://imagenes.elpais.com/resizer/wuermbwoe_Z1wKupKyjMLsv_3rQ=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ZEOB5YOV2JEFFIWLMWUN2KCHCE.jpg"
                    alt="imagen"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section class="page-section bg-dark text-white" id="services">
          <div class="container">
            <div class="text-center">
              <h2 class="section-heading text-uppercase">Nuestros servicios</h2>
              <h3 class="section-subheading text-muted">
                Aqui podrás ver que ofrecemos a nuestros clientes
              </h3>
            </div>
            <div class="row text-center">
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fas fa-circle fa-stack-2x text-primary"></i>
                  <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="my-3">Productos para oficina</h4>
                <p class="section-heading">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fas fa-circle fa-stack-2x text-primary"></i>
                  <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="my-3">Productos para la casa</h4>
                <p class="section-heading">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
              <div class="col-md-4">
                <span class="fa-stack fa-4x">
                  <i class="fas fa-circle fa-stack-2x text-primary"></i>
                  <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
                </span>
                <h4 class="my-3">Productos para el uso diario</h4>
                <p class="section-heading">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container mt-5">
        <div className="row gx-3">
          <section class="page-section" id="about">
            <div class="container">
              <div class="text-center">
                <h2 class="section-heading text-uppercase">Acerca de</h2>
                <h3 class="section-subheading text-muted">Libreria GIGI'S</h3>
              </div>
              <ul class="timeline">
                <li>
                  <div class="timeline-image">
                    <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Story!
                    </h4>
                  </div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4>2009-2011</h4>
                      <h4 class="subheading">Our Humble Beginnings</h4>
                    </div>
                    <div class="timeline-body">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!
                      </p>
                    </div>
                  </div>
                </li>
                <li class="timeline-inverted">
                  <div class="timeline-image">
                    <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Story!
                    </h4>
                  </div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4>March 2011</h4>
                      <h4 class="subheading">An Agency is Born</h4>
                    </div>
                    <div class="timeline-body">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="timeline-image">
                    <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Story!
                    </h4>
                  </div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4>December 2015</h4>
                      <h4 class="subheading">Transition to Full Service</h4>
                    </div>
                    <div class="timeline-body">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!
                      </p>
                    </div>
                  </div>
                </li>
                <li class="timeline-inverted">
                  <div class="timeline-image">
                    <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Story!
                    </h4>
                  </div>
                  <div class="timeline-panel">
                    <div class="timeline-heading">
                      <h4>July 2020</h4>
                      <h4 class="subheading">Phase Two Expansion</h4>
                    </div>
                    <div class="timeline-body">
                      <p class="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!
                      </p>
                    </div>
                  </div>
                </li>
                <li class="timeline-inverted">
                  <div class="timeline-image">
                    <h4>
                      Be Part
                      <br />
                      Of Our
                      <br />
                      Story!
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default inicio;
