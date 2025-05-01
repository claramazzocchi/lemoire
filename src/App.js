import Brioche from "./Brioche";
import React from "react";
import Prenotatavolo from "./Prenotatavolo";
import ListaPrenotazioniTavoli from "./ListaPrenotazioneTavoli";

function App() {
  return (
    <div>
      <h1>Le Moire Cafè Piacenza</h1>
      <Brioche />
      <hr />
      <Prenotatavolo />
      <ListaPrenotazioniTavoli/>
    </div>
  );
}

export default App;
