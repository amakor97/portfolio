import { useEffect, useState } from "react";
import "./_editForm.sass";

function EditForm(props) {

  
  const [selectedStatus, setSelectedStatus] = useState(props.taskStatus);


  useEffect(() => {
    setSelectedStatus(props.taskStatus);
  },)

  return (
    <form className="editContainer__form" onSubmit={props.handleSubmit}>
      <fieldset className="editContainer__fieldset">
        <span>{props.currentId}</span>
        <input className="editContainer__input" type="text" name="taskName" value={props.taskName} onChange={e => props.setTaskName(e.target.value)}></input>
        <textarea className="editContainer__textarea" value={props.taskDesc} onChange={(e) => props.handleMessageChange(e)}></textarea>
        <label>Ожидает
          <input type="radio" name="status" value="waiting" onChange={(e) => {props.setTaskStatus(e.target.value); setSelectedStatus(e.target.value)}} checked={selectedStatus === "waiting"}></input>
        </label>
        <label>В процессе
          <input type="radio" name="status" value="processing" onChange={(e) => {props.setTaskStatus(e.target.value); setSelectedStatus(e.target.value)}} checked={selectedStatus === "processing"}></input>
        </label>
        <label>Выполнена
          <input type="radio" name="status" value="done" onChange={(e) => {props.setTaskStatus(e.target.value); setSelectedStatus(e.target.value)}} checked={selectedStatus === "done"}></input>
        </label>
        <button type="submit">Сохранить</button>
        <button onClick={() => {props.toggleEditing(false); props.toggleAdding(false); props.updateTask(-1)}}>Отмена</button>
      </fieldset>
    </form>
  )
}

export default EditForm;