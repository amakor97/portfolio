import { useState } from "react";

import "./_editContainer.sass";

function EditContainer(props) {
  //console.log(props.task.text);

  const [taskName, setTaskName] = useState(props.task.text);

  const [currentId, setCurrentId] = useState(props.task.id);

  console.log({currentId});
  console.log(props.task.id);
  console.log(props.task.id === currentId);
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

  return (
    <div className="editContainer">
      <form className="editContainer__form">
        <fieldset className="editContainer__fieldset">
          <span>{props.task.id}</span>
          <input className="editContainer__input" type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
          <textarea className="editContainer__textarea">{props.task.description}</textarea>
          <button>Сохранить</button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditContainer;

//onChange={e => setTaskName(e.target.value)}