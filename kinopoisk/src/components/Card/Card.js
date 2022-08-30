import { react, useState, createContext, useContext, useMemo } from "react";
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
  
  const cardPoster = useMemo(() => props.posterUrlPreview);
  
  return (
    <FilmContext.Provider value={props}>
      <div className="Card" onClick={setModalIsOpenToTrue}>
        {
        <img className="Card__bg-img" src={props.posterUrlPreview}/>
      }
      {
        //<img className="Card__bg-img" src={cardPoster}/>
      }
        
        <p className="Card__title">{props.posterUrlPreview}</p>
      </div>

      {modalIsOpen && 
        <ModalWindow closeModal={setModalIsOpenToFalse} filmId={props.filmId} cardNumber={props.cardNumber}/>
      }

    </FilmContext.Provider>
  )
}


export default Card;


//try useMemo if poster preview re-render is noticable