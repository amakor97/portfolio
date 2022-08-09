import { useState, useEffect } from "react";

import "./_editContainer.sass";

import "../EditForm/EditForm";
import EditForm from "../EditForm/EditForm";

function EditContainer(props) {
  const [taskName, setTaskName] = useState(props.task ? props.task.text : "");
  const [currentId, setCurrentId] = useState(-1);
  const [taskDesc, setTaskDesc] = useState(props.task? props.task.desc : "");
  const [taskStatus, setTaskStatus] = useState(props.task ? props.task.status : "");
  const [isReseted, setIsReseted] = useState(false);

  useEffect(() => {
    if ((props.isAdding === false)) {
      if ((props.task) && (props.task.id === currentId)) {
        
        if ((props.task) && (props.editingTaskId === -1)) {
          setCurrentId(props.task.id);
          props.setEditingTaskId(props.task.id);
          setTaskName(props.task.text);
          setTaskDesc(props.task.desc);
          setTaskStatus(props.task.status);
        }
      } else {
        if (props.task) {
          setCurrentId(props.task.id);
          setTaskName(props.task.text);
          setTaskDesc(props.task.desc);
          setTaskStatus(props.task.status);
        }
      } 
    } else {
      if (props.isFormRes === false) {
        setTaskName('');
        setTaskDesc('');
        setTaskStatus('');
        setCurrentId(Date.now());
        props.setIsFormRes(true);
      }
    }
  })

  function handleSubmit(event) {
    event.preventDefault();

    let taskData = {
      id: currentId,
      text: taskName,
      desc: taskDesc,
      status: taskStatus
    }

    props.editTask(taskData);
    props.toggleEditing(false);
    props.updateTask(-1);

    setIsReseted(false);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
  };

  return (
    <div className="editContainer">
      {
        props.isEditing === true &&
        <EditForm handleSubmit={handleSubmit} currentId={currentId} taskName={taskName} setTaskName={setTaskName} taskDesc={taskDesc} setTaskDesc={setTaskDesc} handleMessageChange={handleMessageChange} toggleEditing={props.toggleEditing} toggleAdding={props.toggleAdding} updateTask={props.updateTask} taskStatus={taskStatus} setTaskStatus={setTaskStatus} setIsFormRes={props.setIsFormRes} setCurrentId={setCurrentId}/>
      } 
      {
        props.isWatching === true &&
        <>
          <p>{props.task.text}</p>
          <p>{props.task.desc}</p>
          <p>{props.task.status}</p>
          <button onClick={() => {props.toggleWatching(false); props.updateTask(-1)}}>Скрыть</button>
        </>
      }
    </div>
  )
}

export default EditContainer;