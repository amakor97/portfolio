import "./_editContainer.sass";

function EditContainer(props) {
  return (
    <div className="editContainer">
      <form className="editContainer__form">
        <fieldset className="editContainer__fieldset">
          <span>{props.task.id}</span>
          <input className="editContainer__input" type="text" defaultValue={props.task.text}></input>
          <textarea className="editContainer__textarea">{props.task.description}</textarea>
          <button>Сохранить</button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditContainer;