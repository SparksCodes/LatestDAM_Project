import { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar.jsx";
import PasswordGenerator from "./components/PasswordGenerator.jsx";
import CreditCards from "./components/CreditCards.jsx";
import BankAccounts from "./components/BankAccounts.jsx";
import WholeApps from "./components/WholeApps.jsx";

function App() {
  const [actualPage, setActualPage] = useState("all");

  const mostrarComponente = (page) => {
    setActualPage(page);
  };

 
  return (
    <>
      <div>
        <SideBar mostrarComponente={mostrarComponente} />

        {actualPage === "all" && <PasswordGenerator />}
        {actualPage === "cards" && <CreditCards />}
        {actualPage === "account" && <BankAccounts />}
        {actualPage === "apps" && <WholeApps />}
      </div>
    </>
  );
}

export default App;