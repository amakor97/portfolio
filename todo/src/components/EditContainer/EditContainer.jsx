import "./_editContainer.sass";

function EditContainer() {
  return (
    <div className="editContainer">
      <form className="editContainer__form">
        <fieldset className="editContainer__fieldset">
          <input className="editContainer__input" type="text"></input>
          <textarea className="editContainer__textarea"></textarea>
          <button>Сохранить</button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditContainer;