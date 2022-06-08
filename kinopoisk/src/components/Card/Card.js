import { react, useState, createContext, useContext } from "react";
import Modal from "react-modal";

import "./_card.sass";

import ModalWindow from "../ModalWindow/ModalWindow";

function Card(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
  }

  const FilmContext = createContext();
  

  console.log(props.nameRu);
  return (
    <FilmContext.Provider value={props}>
      <div className="Card" onClick={setModalIsOpenToTrue}>
        <img className="Card__bg-img" src={props.posterUrlPreview}/>
        <p className="Card__title">{props.posterUrlPreview}</p>
      </div>

      {modalIsOpen && 
        <ModalWindow closeModal={setModalIsOpenToFalse} nameRu={props.nameRu}/>
      }

    </FilmContext.Provider>
  )
}


export default Card;