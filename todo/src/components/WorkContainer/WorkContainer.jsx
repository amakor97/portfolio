import { useState, useEffect } from "react";

import EditForm from "../EditForm/EditForm";
import WatchContainer from "../WatchContainer/WatchContainer";

import "./_workContainer.sass";

function WorkContainer(props) {
  // ширина рабочего контейнера
  const [ecWidth, setEcWidth] = useState("100%");

  // при изменении currentTask:
  // если isAdding = false - установить свойства объекта
  // временного хранения и editingTaskId 
  // в соответствии с currentTask
   
  useEffect(() => {
    if ((props.todoList.isAdding === false)) {
      if ((props.todoList.currentTask)) {
        props.formStateHandler("setTaskName", props.todoList.currentTask.name);
        props.formStateHandler("setTaskDesc", props.todoList.currentTask.desc);
        props.formStateHandler("setTaskStatus", props.todoList.currentTask.status);
        props.stateHandler("setEditingTaskId", props.todoList.currentTask.id);
      }
    } else {
      // если isAdding = true, получить временную метку и установить
      // её в качестве id
      props.stateHandler("setEditingTaskId", Date.now());
    }
  }, [props.todoList.currentTask])

  // при изменении ширины контейнера или списка задач
  // пересчитывать ширину рабочего контейнера
  useEffect(() => {
    setEcWidth(props.tdWidth - props.lcWidth);
  }, [props.tdWidth, props.lcWidth])

  // функция - обработчик "отправки" формы
  function handleSubmit(event) {
    // предотврать обновление страницы
    event.preventDefault();

    // подготовить объект на основе id и полей формы
    let editedTaskData = {
      id: props.todoList.editingTaskId,
      name: props.formData.taskName,
      desc: props.formData.taskDesc,
      status: props.formData.taskStatus,
    }

    //передать объект, устновить isEditing в false и currentTask в undefined и очистить форму
    props.editTask(editedTaskData);
    props.stateHandler("setIsEditing", false);
    props.stateHandler("setCurrentTask", -1);
    props.formStateHandler("resetForm", 0);
  }

  // в случае isEditing = true вернуть компонент EditForm
  // в случае isWatching = true вернуть компонент WatchContainer
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