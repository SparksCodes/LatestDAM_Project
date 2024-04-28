import { useState } from "react";
import connection from "../dbConnection.js";
import readData from "../dbGetData.js";
import "./BankAccounts.css";

function BankAccounts() {
  const [formAccount, setFormAccount] = useState({
    banco: "",
    cuenta: "",
    usuario: "",
    contrasenya: "",
  });

  const getDataForm = (event) => {
    const { name, value } = event.target;
    setFormAccount({
      ...formAccount,
      [name]: value,
    });
  };

  function dataget() {
    readData("bankAccount")
      .then(data => {
        const tableContainer = document.getElementById("tableCount");
  
        if (tableContainer) {
         
          const table = document.createElement("table");
  
          const headerRow = table.createTHead().insertRow();
          const headers = ["ID", "Entidad", "Número Cuenta", "Usuario", "Contraseña"];
          headers.forEach((header) => {
            const cell = headerRow.insertCell();
            cell.textContent = header;
          });
  
          const body = table.createTBody();
          data.forEach((item) => {
            const row = body.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.banco;
            row.insertCell().textContent = item.cuenta;
            row.insertCell().textContent = item.usuario;
            row.insertCell().textContent = item.contrasenya;
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

    connection("bankAccount", formAccount);

    setFormAccount({
      banco: "",
      cuenta: "",
      usuario: "",
      contrasenya: "",
    });
  };

  return (
    <>
      <div className="caja">
        <h1>CUENTA BANCARIA</h1>
        <div className="container__AccountData">
          <fieldset className="main__fieldset">
            <legend className="main__legend">
              Introduce tu Cuenta Bancaria
            </legend>
            <div className="form_main">
              <form onSubmit={handleSubmit}>
                <div className="form_box">
                  <div className="form_ent">
                    <label>Entidad Bancaria</label>
                    <input
                      type="text"
                      name="banco"
                      value={formAccount.banco}
                      onChange={getDataForm}
                      placeholder="Introduce Nombre Entidad"
                    ></input>
                  </div>
                  <div className="form_num">
                    <label>Número de Cuenta</label>
                    <input
                      type="text"
                      name="cuenta"
                      value={formAccount.cuenta}
                      onChange={getDataForm}
                      placeholder="Introduce Número"
                    ></input>
                  </div>
                  <div className="form_pin">
                    <label>Usuario</label>
                    <input
                      type="text"
                      name="usuario"
                      value={formAccount.usuario}
                      onChange={getDataForm}
                      placeholder="Introduce Usuario"
                    ></input>
                  </div>
                  <div className="form_csv">
                    <label>Contraseña</label>
                    <input
                      type="text"
                      name="contrasenya"
                      value={formAccount.contrasenya}
                      onChange={getDataForm}
                      placeholder="Introduce Contraseña"
                    ></input>
                  </div>
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </div>
          </fieldset>
          <div className="result">
            <button onClick={dataget}>Obtén Resultado</button>
            <div id="tableCount"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankAccounts;
