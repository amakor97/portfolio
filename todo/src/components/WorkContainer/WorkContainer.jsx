import { useState, useEffect } from "react";

import EditForm from "../EditForm/EditForm";
import WatchContainer from "../WatchContainer/WatchContainer";

import "./_workContainer.sass";

function WorkContainer(props) {
  const [ecWidth, setEcWidth] = useState("100%");

  useEffect(() => {
    if ((props.todoList.isAdding === false)) {
      if ((props.todoList.currentTask)) {
        props.formStateHandler("setTaskName", props.todoList.currentTask.name);
        props.formStateHandler("setTaskDesc", props.todoList.currentTask.desc);
        props.formStateHandler("setTaskStatus", props.todoList.currentTask.status);
        props.stateHandler("setEditingTaskId", props.todoList.currentTask.id);
      }
    } else {
      props.stateHandler("setEditingTaskId", Date.now());
    }
  }, [props.todoList.currentTask])

  useEffect(() => {
    setEcWidth(props.tdWidth - props.lcWidth);
  }, [props.tdWidth, props.lcWidth])

  function handleSubmit(event) {
    event.preventDefault();

    let editedTaskData = {
      id: props.todoList.editingTaskId,
      name: props.formData.taskName,
      desc: props.formData.taskDesc,
      status: props.formData.taskStatus,
    }

    props.editTask(editedTaskData);
    props.stateHandler("setIsEditing", false);
    props.stateHandler("setCurrentTask", -1);
    props.formStateHandler("resetForm", 0);
  }

  return (
    <div className="workContainer" style={{width: ecWidth}}>
      {
        props.todoList.isEditing === true &&
        <EditForm 
          stateHandler={props.stateHandler}
          handleSubmit={handleSubmit}
          formData={props.formData}
          formStateHandler={props.formStateHandler}
        />
      } 
      {
        props.todoList.isWatching === true &&
        <WatchContainer 
          todoList={props.todoList}
          stateHandler={props.stateHandler}
          formStateHandler={props.formStateHandler}
        />
      }
    </div>
  )
}

export default WorkContainer;