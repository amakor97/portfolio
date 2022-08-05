import "./_editForm.sass";

function EditForm(props) {

  return (
    <form className="editContainer__form" onSubmit={props.handleSubmit}>
      <fieldset className="editContainer__fieldset">
        <span>{props.currentId}</span>
        <input className="editContainer__input" type="text" name="taskName" value={props.taskName} onChange={e => props.setTaskName(e.target.value)}></input>
        <textarea className="editContainer__textarea" value={props.taskDesc} onChange={(e) => props.handleMessageChange(e)}></textarea>
        <button type="submit">Сохранить</button>
        <button onClick={() => {props.toggleEditing(false); props.toggleAdding(false); props.updateTask(-1)}}>Отмена</button>
      </fieldset>
    </form>
  )
}

export default EditForm;