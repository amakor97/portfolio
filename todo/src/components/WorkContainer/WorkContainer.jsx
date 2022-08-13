import { useState, useEffect } from "react";

import "./_workContainer.sass";

import EditForm from "../EditForm/EditForm";
import WatchContainer from "../WatchContainer/WatchContainer";

function WorkContainer(props) {
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
      props.stateHandler("setEditingTaskId", Date.now());
    }
  }, [props.todoList.realCurrentTask])

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
    props.stateHandler("setRealCurrentTask", -1);
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