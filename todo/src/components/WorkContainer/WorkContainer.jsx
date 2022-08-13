import { useState, useEffect } from "react";

import "./_workContainer.sass";

import EditForm from "../EditForm/EditForm";
import WatchContainer from "../WatchContainer/WatchContainer";

function EditContainer(props) {
  const [taskName, setTaskName] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.text : "");
  const [currentId, setCurrentId] = useState(-1);
  const [taskDesc, setTaskDesc] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.desc : "");
  const [taskStatus, setTaskStatus] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.status : "");
  const [ecWidth, setEcWidth] = useState("100%");

  useEffect(() => {
    if ((props.todoList.isAdding === false)) {
      if ((props.todoList.realCurrentTask) && (props.todoList.realCurrentTask.id === currentId)) {
        if ((props.todoList.realCurrentTask) && (props.todoList.editingTaskId === -1)) {
// remove currentId? because editingTaskId looks very similar
          setCurrentId(props.todoList.realCurrentTask.id);
          props.stateHandler("setEditingTaskId", props.todoList.realCurrentTask.id);
          setTaskName(props.todoList.realCurrentTask.text);
          setTaskDesc(props.todoList.realCurrentTask.desc);
          setTaskStatus(props.todoList.realCurrentTask.status);
        }
      } else {
        if (props.todoList.realCurrentTask) {
          setCurrentId(props.todoList.realCurrentTask.id);
          props.stateHandler("setEditingTaskId", props.todoList.realCurrentTask.id);
          setTaskName(props.todoList.realCurrentTask.text);
          setTaskDesc(props.todoList.realCurrentTask.desc);
          setTaskStatus(props.todoList.realCurrentTask.status);
        }
      } 
    } else {
      if (props.todoList.isFormReseted === false) {
        setTaskName('');
        setTaskDesc('');
        setTaskStatus('');
        setCurrentId(Date.now());
        props.stateHandler("setIsFormReseted", true);
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
    props.stateHandler("setIsEditing", false);
    props.stateHandler("SETREALCURRENTTASK", -1);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
  };

  return (
    <div className="workContainer" style={{width: ecWidth}}>
      {
        props.todoList.isEditing === true &&
        <EditForm 
          stateHandler={props.stateHandler}
          handleSubmit={handleSubmit}

          currentId={currentId} 
          taskName={taskName} 
          setTaskName={setTaskName} 
          taskDesc={taskDesc} 
          setTaskDesc={setTaskDesc} 
          handleMessageChange={handleMessageChange}
          taskStatus={taskStatus} 
          setTaskStatus={setTaskStatus} 
          setCurrentId={setCurrentId}
        />
      } 
      {
        props.todoList.isWatching === true &&
        <WatchContainer 
          todoList={props.todoList}
          stateHandler={props.stateHandler}
        />
      }
    </div>
  )
}

export default EditContainer;