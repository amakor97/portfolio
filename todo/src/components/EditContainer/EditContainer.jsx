import { useState } from "react";

import "./_editContainer.sass";

function EditContainer(props) {
  //console.log(props.task.text);

  const [taskName, setTaskName] = useState(props.task.text);

  const [currentId, setCurrentId] = useState(-1);

  //const [isEditing, setIsEditing] = useState(false);

  console.log({currentId});
  console.log(props.isEditing);

  if (props.task.id === currentId) {
    console.log("ok");
  } else {
    console.log("warning, needs to reset taskName");
    console.log("current task name:", props.task.text);
    setCurrentId(props.task.id);
    setTaskName(props.task.text);

  }

  let tName = props.task.text;
  console.log({tName});

  function handleChange(event) {
    console.log(this);
    console.log(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(event.target[1].value)
    console.log(event.target.elements.taskName.value)
    console.log(event.target.taskName.value)

    let taskData = {
      id: currentId,
      text: event.target[1].value
    }

    console.log(taskData);

    props.editTask(taskData);

    props.toggleEditing(false);
  }

  return (
    <div className="editContainer">
      {
        props.isEditing === true &&
        <form className="editContainer__form" onSubmit={handleSubmit}>
          <fieldset className="editContainer__fieldset">
            <span>{props.task.id}</span>
            <input className="editContainer__input" type="text" name="taskName" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
            <textarea className="editContainer__textarea">{props.task.description}</textarea>
            <button type="submit">Сохранить</button>
          </fieldset>
        </form>
      }
    </div>
  )
}

export default EditContainer;

//onChange={e => setTaskName(e.target.value)}