import React, { useEffect, useState } from "react";

function ListaPrenotazioniTavoli() {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [prenotazioniBrioche, setPrenotazioniBrioche] = useState([]);
  const [accessoConsentito, setAccessoConsentito] = useState(false);
  const [password, setPassword] = useState("");

  const PASSWORD_GESTORE = "Fralli2025$";

  const caricaPrenotazioni = async () => {
    const res = await fetch("http://localhost:5000/prenotazioni-tavoli");
    const data = await res.json();
    setPrenotazioni(data);

    const resBrioche = await fetch("http://localhost:5000/prenotazioni-brioche");
    const dataBrioche = await resBrioche.json();
    setPrenotazioniBrioche(dataBrioche);
  };

  useEffect(() => {
    if (accessoConsentito) {
      caricaPrenotazioni();
    }
  }, [accessoConsentito]);

  const gestisciAccesso = (e) => {
    e.preventDefault();
    if (password === PASSWORD_GESTORE) {
      setAccessoConsentito(true);
    } else {
      alert("Password errata");
    }
  };

  const aggiornaConferma = async (id, confermata) => {
    await fetch(`http://localhost:5000/prenotazioni-tavoli/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ confermata })
    });
    caricaPrenotazioni();
  };

  if (!accessoConsentito) {
    return (
      <div style={{ padding: "2rem" }}>
        <h3> Accesso Gestore</h3>
        <form onSubmit={gestisciAccesso}>
          <input
            type="password"
            value={password}
            placeholder="Inserisci la password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Accedi</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Prenotazioni Tavoli: </h2>
      {prenotazioni.length === 0 ? (
        <p>Nessuna prenotazione trovata.</p>
      ) : (
        <ul>
          {prenotazioni.map((p) => (
            <li key={p._id} style={{ marginBottom: "1rem" }}>
              <strong>{p.nome}</strong> ha prenotato per {p.persone} persone il {p.data} alle {p.orario}<br />
               {p.telefono}<br />
              Stato: {p.confermata ? " Confermata" : " In attesa"}<br />
              {!p.confermata && (
                <>
                  <button onClick={() => aggiornaConferma(p._id, true)}>Conferma</button>
                  <button onClick={() => aggiornaConferma(p._id, false)} style={{ marginLeft: "0.5rem" }}>Rifiuta</button>
                  </>
            )}
          </li>
        ))}
      </ul>
    )}
    <h2>Prenotazioni Brioche: </h2>
      {prenotazioniBrioche.length === 0 ? (
        <p>Nessuna prenotazione trovata.</p>
      ) : (
        <ul>
          {prenotazioniBrioche.map((b) => (
            <li key={b._id} style={{ marginBottom: "1rem" }}>
              <strong>{b.nome}</strong> ha prenotato il {b.data} alle {b.orario}<br />
              Telefono: {b.numeroditelefono}<br />
              Brioche: {b.brioche?.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaPrenotazioniTavoli;