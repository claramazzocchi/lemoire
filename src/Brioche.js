import React, { useState } from "react";

const GUSTI = [
  "Cioccolato",
  "Cioccolato bianco",
  "Crema",
  "Frutti di bosco",
  "Albicocca",
  "Vegana",
  "Conchiglia cioccolato",
  "Conchiglia alla crema",
  "Pistacchio",
  "Cioccolato e pistacchio",
  "Nocciola",
  "Nocciola e cioccolato",
  "Crema e mora",
  "Carbone",
  "Integrale",
];

function Brioche() {
  const [nome, setNome] = useState("");
  const [numeroditelefono, setnumeroditelefono] = useState("");
  const [data, setData] = useState("");
  const [orario, setOrario] = useState("");
  const [gusti, setGusti] = useState([""]);
  const [conferma, setConferma] = useState("");

  const aggiungiGusto = () => {
    if (gusti.length < 15) {
      setGusti([...gusti, ""]);
    }
  };

  const cambiaGusto = (index, valore) => {
    const nuoviGusti = [...gusti];
    nuoviGusti[index] = valore;
    setGusti(nuoviGusti);
  };

  const inviaPrenotazione = async (e) => {
    e.preventDefault();

    const prenotazione = {
      nome,
      numeroditelefono,
      data,
      orario,
      brioche: gusti.filter(g => g) // rimuove vuoti
    };

    try {
      const res = await fetch("http://localhost:5000/prenota-brioche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prenotazione)
      });

      const data = await res.json();
      setConferma(data.messaggio);
    } catch (error) {
      console.error("Errore:", error);
      setConferma("Errore durante la prenotazione.");
    }
  };

    const domani = new Date();
    domani.setDate(domani.getDate() + 1);
    const minDate = domani.toISOString().split("T")[0];
  
    return (
    <div style={{ padding: "2rem" }}>
      <h2>Prenota fino a 15 brioche 🥐</h2>
      <form onSubmit={inviaPrenotazione}>
        <div>
          <label>Nome:</label><br />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Numero di telefono:</label><br />
          <input type="tel" value={numeroditelefono} onChange={(e) => { const soloNumeri = e.target.value.replace(/\D/g, "");
            setnumeroditelefono(soloNumeri); }}
        pattern="[0-9]{10,15}"
        placeholder="Es. 3451234567" required />
        </div>
        <div>
          <label>Giorno del ritiro:</label><br />
          <input type="date" value={data} min={minDate} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div>
          <label>Orario di ritiro (07:00 - 12:00):</label><br />
          <input
            type="time"
            value={orario}
            min="07:00"
            max="12:00"
            onChange={(e) => setOrario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seleziona i gusti delle brioche:</label>
          {gusti.map((gusto, index) => (
            <div key={index}>
              <select value={gusto} onChange={(e) => cambiaGusto(index, e.target.value)} required>
                <option value="">-- seleziona un gusto --</option>
                {GUSTI.map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
            </div>
          ))}
          {gusti.length < 15 && (
            <button type="button" onClick={aggiungiGusto} style={{ marginTop: "0.5rem" }}>
              + Aggiungi brioche
            </button>
          )}
        </div>
        <br />
        <button type="submit">Prenota</button>
      </form>
      {conferma && <p><strong>{conferma}</strong></p>}
    </div>
  );
}

export default Brioche;
