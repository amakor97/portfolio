import { useState, useEffect } from "react";

import "./_workContainer.sass";

import EditForm from "../EditForm/EditForm";
import WatchContainer from "../WatchContainer/WatchContainer";

function WorkContainer(props) {
  const [taskName, setTaskName] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.text : "");
  const [currentId, setCurrentId] = useState(-1);
  const [taskDesc, setTaskDesc] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.desc : "");
  const [taskStatus, setTaskStatus] = useState(props.todoList.realCurrentTask ? props.todoList.realCurrentTask.status : "");
  const [ecWidth, setEcWidth] = useState("100%");

  useEffect(() => {
    if ((props.todoList.isAdding === false)) {
      if ((props.todoList.realCurrentTask) && (props.todoList.realCurrentTask.id !== currentId)) {
        setTaskName(props.todoList.realCurrentTask.text);
        setTaskDesc(props.todoList.realCurrentTask.desc);
        setTaskStatus(props.todoList.realCurrentTask.status);

        setCurrentId(props.todoList.realCurrentTask.id);
        props.stateHandler("setEditingTaskId", props.todoList.realCurrentTask.id);
      }
    } else {
      if (props.todoList.isFormReseted === false) {
        setTaskName('');
        setTaskDesc('');
        setTaskStatus('');
        props.stateHandler("setIsFormReseted", true);
        
        let time = Date.now();
        setCurrentId(time);
        props.stateHandler("setEditingTaskId", time);
      }
    }
  }, [props, currentId])

  function resetForm() {
    setTaskName('');
    setTaskDesc('');
    setTaskStatus('');
    props.stateHandler("setIsFormReseted", true);
  }

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
    props.stateHandler("setRealCurrentTask", -1);
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
          resetForm={resetForm}

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

export default WorkContainer;