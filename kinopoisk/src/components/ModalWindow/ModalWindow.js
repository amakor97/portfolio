import "./_modalWindow.sass";

import FilmInfo from "../FilmInfo/FilmInfo";

function Modal(props) {
  console.log(props.closeModal);
  console.log(props.filmId);

  return (
    <div className="Modal-Window" onClick={props.closeModal}>
      <FilmInfo 
        filmId={props.filmId} 
        cardNumber={props.cardNumber} 
        closeModal={props.closeModal}
      />
    </div>
  )
}

export default Modal;