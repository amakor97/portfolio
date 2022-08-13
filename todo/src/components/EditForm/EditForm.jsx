import { useEffect, useState } from "react";
import "./_editForm.sass";

function EditForm(props) {
  const [selectedStatus, setSelectedStatus] = useState(props.formData.taskStatus);

  useEffect(() => {
    setSelectedStatus(props.taskStatus);
  }, [props.taskStatus]);

  return (
    <form className="editForm__form" onSubmit={props.handleSubmit}>
      <fieldset className="editForm__fieldset">
        <input 
          className="editForm__input" 
          type="text" 
          name="taskName" 
          value={props.formData.taskName} 
          onChange={e => {
            props.setTaskName(e.target.value);
            props.formStateHandler("setTaskName", e.target.value);
          }}
        ></input>
        <textarea 
          className="editForm__textarea" 
          value={props.formData.taskDesc} 
          onChange={(e) => props.handleMessageChange(e)}
        ></textarea>
        <label className="editForm__label">Ожидает
          <input 
            type="radio" 
            name="status" 
            value="waiting" 
            onChange={(e) => {
              props.setTaskStatus(e.target.value);
              props.formStateHandler("setTaskStatus", e.target.value);
              setSelectedStatus(e.target.value)
            }} 
            checked={selectedStatus === "waiting"}
          ></input>
        </label>
        <label className="editForm__label">В процессе
          <input 
            type="radio" 
            name="status" 
            value="processing" 
            onChange={(e) => {
              props.setTaskStatus(e.target.value);
              props.formStateHandler("setTaskStatus", e.target.value);
              setSelectedStatus(e.target.value)
            }} 
            checked={selectedStatus === "processing"}
            ></input>
        </label>
        <label className="editForm__label">Выполнена
          <input 
          type="radio" 
          name="status" 
          value="done" 
          onChange={(e) => {
            props.setTaskStatus(e.target.value);
            props.formStateHandler("setTaskStatus", e.target.value);
            setSelectedStatus(e.target.value)
          }}
          checked={selectedStatus === "done"}
        ></input>
        </label>
        <button type="submit">Сохранить</button>
        <button onClick={() => {
          props.stateHandler("setIsEditing", false);
          props.stateHandler("setIsAdding", false);
          props.stateHandler("setRealCurrentTask", -1);
          props.setCurrentId(-1);
          props.stateHandler("setEditingTaskId", -1);
          props.stateHandler("setIsFormReseted", false);
          props.formStateHandler("resetForm", 0);
          props.resetForm();
        }}>Отмена</button>
      </fieldset>
    </form>
  )
}

export default EditForm;