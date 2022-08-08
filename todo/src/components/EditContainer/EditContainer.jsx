import { useState, useEffect } from "react";

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
  const [taskStatus, setTaskStatus] = useState(props.task ? props.task.status : "");
  const [isReseted, setIsReseted] = useState(false);


  //const [isEditing, setIsEditing] = useState(false);

  console.log("props current task", props.task);
  console.log("is form res", props.isFormRes);


  console.log({currentId});

  useEffect(() => {
    if ((props.isAdding === false)) {
      if ((props.task) && (props.task.id === currentId)) {
        console.log("ok");
        
        if ((props.task) && (props.editingTaskId === -1)) {
          console.log("trying to watch after editing");
          console.log("need to reset task data");
          setCurrentId(props.task.id);
          props.setEditingTaskId(props.task.id);
          setTaskName(props.task.text);
          setTaskDesc(props.task.desc);
          console.log("status:", props.task.status);
          setTaskStatus(props.task.status);
        }
      } else {
        console.log("props task:", props.task);
        console.log("warning, needs to reset taskName");
        //console.log("current task name:", props.task.text);
        if (props.task) {
          setCurrentId(props.task.id);
          setTaskName(props.task.text);
          setTaskDesc(props.task.desc);
          console.log("status:", props.task.status);
          setTaskStatus(props.task.status);
        }
      } 
    } else {
      console.log("adding new task");
      console.log("props current task", props.task);
      console.log("isFormRes before:", props.isFormRes);
      if (props.isFormRes === false) {
        setTaskName('');
        setTaskDesc('');
        setTaskStatus('');
        setCurrentId(Date.now());
        console.log(currentId);
        props.setIsFormRes(true);
        console.log("isFormRes after:", props.isFormRes);
      }
    }
  })




  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[1].value);
    console.log(event.target[2].value);
    console.log(event.target["status"].value);

    let taskData = {
      id: currentId,
      text: taskName,
      desc: taskDesc,
      status: taskStatus
    }

    console.log(taskData);
    props.editTask(taskData);
    props.toggleEditing(false);
    props.updateTask(-1);

    setIsReseted(false);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
    console.log(e.target.value);
  };

  console.log({taskStatus});

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

//onChange={e => setTaskName(e.target.value)}