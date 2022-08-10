import { useState, useEffect } from "react";

import "./_editContainer.sass";

import EditForm from "../EditForm/EditForm";

function EditContainer(props) {
  const [taskName, setTaskName] = useState(props.task ? props.task.text : "");
  const [currentId, setCurrentId] = useState(-1);
  const [taskDesc, setTaskDesc] = useState(props.task? props.task.desc : "");
  const [taskStatus, setTaskStatus] = useState(props.task ? props.task.status : "");
  const [ecWidth, setEcWidth] = useState("100%");

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
      if (props.isFormReseted === false) {
        setTaskName('');
        setTaskDesc('');
        setTaskStatus('');
        setCurrentId(Date.now());
        props.setIsFormReseted(true);
      }
    }
  }, [props, currentId])

  useEffect(() => {
    setEcWidth(props.tdWidth - props.lcWidth);
  }, [props.tdWidth, props.lcWidth])

  function handleSubmit(event) {
    event.preventDefault();

    let taskData = {
      id: currentId,
      text: taskName,
      desc: taskDesc,
      status: taskStatus
    }

    props.editTask(taskData);
    props.setIsEditing(false);
    props.updateTask(-1);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
  };

  return (
    <div className="editContainer" style={{width: ecWidth}}>
      {
        props.isEditing === true &&
        <EditForm 
          handleSubmit={handleSubmit} 
          currentId={currentId} 
          taskName={taskName} 
          setTaskName={setTaskName} 
          taskDesc={taskDesc} 
          setTaskDesc={setTaskDesc} 
          handleMessageChange={handleMessageChange} 
          setIsEditing={props.setIsEditing} 
          setIsAdding={props.setIsAdding} 
          updateTask={props.updateTask} 
          taskStatus={taskStatus} 
          setTaskStatus={setTaskStatus} 
          setCurrentId={setCurrentId}
        />
      } 
      {
        props.isWatching === true &&
        <>
          <p>{props.task.text}</p>
          <p>{props.task.desc}</p>
          <p>{props.task.status}</p>
          <button onClick={() => {
            props.setIsWatching(false); 
            props.updateTask(-1)}
            }>Скрыть
          </button>
        </>
      }
    </div>
  )
}

export default EditContainer;