import './App.css';
import Brioche from "./Brioche"; 
import React from "react";
import Prenotatavolo from "./Prenotatavolo";
import ListaPrenotazioniTavoli from "./ListaPrenotazioneTavoli";

function App() {
  return (
    <div>
      {/* Immagine prima del contenuto */}
      <img 
        src="https://scontent-mxp2-1.xx.fbcdn.net/v/t39.30808-6/393491037_1077176930328019_3391376420116409524_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=AEE1_i_w-EYQ7kNvwHTnpaO&_nc_oc=Admh5NmsooZFUhdMTJh07j_XvV95sNl1gtyNgjEPfLxCKXFFEGgu8kuv8J001Chro9s&_nc_zt=23&_nc_ht=scontent-mxp2-1.xx&_nc_gid=PPiww-KbZ0Cbbb62eejBhw&oh=00_AfLkdyDeR-F-4kp5CPnYOF7yz1YHl_h8jyHhZ3GfdxYcAw&oe=681FF4C3" 
        alt="Le Moire Cafè"
        style={{ width: "100%", height: "auto", marginBottom: "2rem" }} // Stile per adattare l'immagine
      />
      <Brioche />
      <hr />
      <Prenotatavolo />
      <ListaPrenotazioniTavoli />
    </div>
  );
}

export default App;
