import React from "react";
import { ReactComponent as ExitosoSvg } from "../svg/pay_cash_payment_money_dollar_bill_icon_143267.svg";

const Pagoexitoso = () => {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <div>
            <div>
              <ExitosoSvg width={300} />
            </div>
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por confiar en nosotros</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagoexitoso;
