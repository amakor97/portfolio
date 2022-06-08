import "./_modalWindow.sass";

import FilmInfo from "../FilmInfo/FilmInfo";

function Modal(props) {
  console.log(props.closeModal);

  return (
    <div className="Modal" onClick={props.closeModal}>
      <FilmInfo nameRu={props.nameRu}/>
    </div>
  )
}

export default Modal;