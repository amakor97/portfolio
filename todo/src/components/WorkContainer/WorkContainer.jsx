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
      if ((props.todoList.realCurrentTask)) {
        props.formStateHandler("setTaskName", props.todoList.realCurrentTask.name);
        props.formStateHandler("setTaskDesc", props.todoList.realCurrentTask.desc);
        props.formStateHandler("setTaskStatus", props.todoList.realCurrentTask.status);
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
  }, [props.todoList.realCurrentTask])

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

    console.log(props.formData);

    let taskData = {
      id: props.todoList.editingTaskId,
      name: props.formData.taskName,
      desc: props.formData.taskDesc,
      status: props.formData.taskStatus,
      //text: taskName,
      //desc: taskDesc,
      //status: taskStatus
    }

    props.editTask(taskData);
    props.stateHandler("setIsEditing", false);
    props.stateHandler("setRealCurrentTask", -1);
  }

  function handleMessageChange(e) {
    setTaskDesc(e.target.value);
    props.formStateHandler("setTaskDesc", e.target.value);
  };

  return (
    <div className="workContainer" style={{width: ecWidth}}>
      {
        props.todoList.isEditing === true &&
        <EditForm 
          stateHandler={props.stateHandler}
          handleSubmit={handleSubmit}

          formData={props.formData}
          formStateHandler={props.formStateHandler}

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

          formData={props.formData}
          formStateHandler={props.formStateHandler}
        />
      }
    </div>
  )
}

export default WorkContainer;