import React, { useState } from "react";

function PrenotaTavolo() {
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [orario, setOrario] = useState("");
  const [persone, setPersone] = useState(2);
  const [conferma, setConferma] = useState("");

  const oggi = new Date();
  oggi.setDate(oggi.getDate());
  const minDate = oggi.toISOString().split("T")[0];

  const inviaPrenotazione = async (e) => {
    e.preventDefault();

    const prenotazione = {
      nome,
      telefono,
      email,
      data,
      orario,
      persone
    };

    try {
      const res = await fetch("https://backend-lemoire.onrender.com/prenotazioni-tavoli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prenotazione),
      });

      const data = await res.json();
      setConferma(data.messaggio);
    } catch (error) {
      console.error("Errore:", error);
      setConferma("Errore durante la prenotazione.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prenotazione tavolo:</h2>
      <form onSubmit={inviaPrenotazione}>
        <div>
          <label>Nome:</label><br />
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Telefono:</label><br />
          <input type="tel" value={telefono} onChange={(e) => {
            const numeri = e.target.value.replace(/\D/g, "");
            setTelefono(numeri);
          }} pattern="[0-9]{10,15}" required />
        </div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div>
          <label>Giorno:</label><br />
          <input type="date" value={data} min={minDate} onChange={(e) => setData(e.target.value)} required />
        </div>
        <div>
          <label>Orario:</label><br />
          <input type="time" value={orario} min="07:00" max="23:59" onChange={(e) => setOrario(e.target.value)} required />
        </div>
        <div>
          <label>Numero di persone:</label><br />
          <input type="number" min="1" max="30" value={persone} onChange={(e) => setPersone(e.target.value)} required />
        </div>
        <br />
        <button type="submit">Prenota Tavolo</button>
      </form>
      {conferma && <p><strong>{conferma}</strong></p>}
    </div>
  );
}

export default PrenotaTavolo;
