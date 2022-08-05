import { useState } from "react";

import "./_editContainer.sass";

import "../EditForm/EditForm";
import EditForm from "../EditForm/EditForm";

function EditContainer(props) {
  //console.log(props.task.text);

  console.log("PROPS", props);
  //console.log("Props task desc", props.task.desc);

  const [taskName, setTaskName] = useState(props.task ? props.task.text : "");
  const [currentId, setCurrentId] = useState(-1);
  const [taskDesc, setTaskDesc] = useState(props.task? props.task.desc : "");
  const [isReseted, setIsReseted] = useState(false);

  //const [isEditing, setIsEditing] = useState(false);

  console.log("props current task", props.task);

  if ((props.isAdding === false)) {
    if ((props.task) && (props.task.id === currentId)) {
      console.log("ok");
    } else {
      console.log("props task:", props.task);
      console.log("warning, needs to reset taskName");
      //console.log("current task name:", props.task.text);
      if (props.task) {
        setCurrentId(props.task.id);
        setTaskName(props.task.text);
        setTaskDesc(props.task.desc);
      }

    } 
  } else {
    console.log("adding new task");
    console.log("props current task", props.task);
    if (isReseted === false) {
      setTaskName('');
      setTaskDesc('');
      setCurrentId(Date.now());
      console.log(currentId);
      setIsReseted(true);
    }
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[1].value);
    console.log(event.target[2].value);

    let taskData = {
      id: currentId,
      text: event.target[1].value,
      desc: event.target[2].value
    }

    console.log(taskData);
    props.editTask(taskData);
    props.toggleEditing(false);

    setIsReseted(false);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="editContainer">
      {
        props.isEditing === true &&
        <EditForm handleSubmit={handleSubmit} currentId={currentId} taskName={taskName} setTaskName={setTaskName} taskDesc={taskDesc} setTaskDesc={setTaskDesc} handleMessageChange={handleMessageChange} toggleEditing={props.toggleEditing} toggleAdding={props.toggleAdding}/>
      } 
      {
        props.isWatching === true &&
        <>
          <p>{taskName}</p>
          <p>{taskDesc}</p>
          <button onClick={() => {props.toggleWatching(false)}}>Скрыть</button>
        </>
      }
    </div>
  )
}

export default EditContainer;

//onChange={e => setTaskName(e.target.value)}