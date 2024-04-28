import { useState } from "react";
import connection from "../dbConnection.js";
import  readData  from "../dbGetData.js";
import "./CreditCard.css";

function CreditCards() {
  const [formCard, setFormCard] = useState({
    entidad: "",
    numero: "",
    pin: "",
    csv: "",
  });

  const getDataForm = (event) => {
    const { name, value } = event.target;

    setFormCard({
      ...formCard,
      [name]: value,
    });
  };

  
  

  function dataget() {
    readData("creditCard")
      .then( (data) => {
        const tableContainer = document.getElementById("tableContainer");
  
        if (tableContainer) {
         
          const table = document.createElement("table");
  
          const headerRow = table.createTHead().insertRow();
          const headers = ["ID", "Entidad", "Número", "PIN", "CSV"];
          headers.forEach((header) => {
            const cell = headerRow.insertCell();
            cell.textContent = header;
          });
  
          const body = table.createTBody();
          data.forEach((item) => {
            const row = body.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.entidad;
            row.insertCell().textContent = item.numero;
            row.insertCell().textContent = item.pin;
            row.insertCell().textContent = item.csv;
          });
  
          tableContainer.innerHTML = '';
          tableContainer.appendChild(table);
        } else {
          console.error("El contenedor tableContainer no fue encontrado.");
        }
  
        console.log("Datos de las tarjetas de crédito:", data);
      })
      .catch((error) => {
        console.error("Error al leer los datos:", error);
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    connection("creditCard", formCard);

    setFormCard({
      entidad: "",
      numero: "",
      pin: "",
      csv: "",
    });
  };

  return (
    <>
      <div className="caja">
        <h1>TARJETAS</h1>
        <div className="container__CardsData">
          <fieldset className="main__fieldset">
            <legend className="main__legend">
              Introduce Tarjeta de Crédito
            </legend>
            <div className="form_main">
              <form onSubmit={handleSubmit}>
                <div className="form_box">
                  <div className="form_ent">
                    <label>Entidad</label>
                    <input
                      type="text"
                      name="entidad"
                      value={formCard.entidad}
                      onChange={getDataForm}
                      placeholder="Introduce Nombre Entidad"
                    ></input>
                  </div>
                  <div className="form_num">
                    <label>Número</label>
                    <input
                      type="text"
                      name="numero"
                      value={formCard.numero}
                      onChange={getDataForm}
                      placeholder="Introduce Número"
                    ></input>
                  </div>
                  <div className="form_pin">
                    <label>PIN</label>
                    <input
                      type="text"
                      name="pin"
                      value={formCard.pin}
                      onChange={getDataForm}
                      placeholder="Introduce PIN"
                    ></input>
                  </div>
                  <div className="form_csv">
                    <label>CSV</label>
                    <input
                      type="text"
                      name="csv"
                      value={formCard.csv}
                      onChange={getDataForm}
                      placeholder="Introduce CSV"
                    ></input>
                  </div>
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </div>
          </fieldset>
          <div className="card_draw">
            <button onClick={dataget}>Obtener Datos</button>
            <div id="tableContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCards;
