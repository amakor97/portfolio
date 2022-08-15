import { useEffect, useState } from "react";

import "./_editForm.sass";

function EditForm(props) {
  // получить статус задачи
  const [selectedStatus, setSelectedStatus] = 
    useState(props.formData.taskStatus);

  // менять статус при изменении 
  useEffect(() => {
    setSelectedStatus(props.formData.taskStatus);
  }, [props.formData.taskStatus]);

  // вернуть форму
  return (
    <form className="editForm" onSubmit={props.handleSubmit}>
      <fieldset className="editForm__fieldset">
        {
          // поле ввода названия
        }
        <input 
          className="editForm__input" 
          type="text" 
          name="taskName"
          placeholder="Название задачи"
          required
          value={props.formData.taskName} 
          onChange={e => props.formStateHandler("setTaskName", e.target.value)}></input>
        {
          // поле ввода описания
        }
        <textarea 
          className="editForm__textarea" 
          value={props.formData.taskDesc}
          placeholder="Описание задачи" 
          onChange={e => props.formStateHandler("setTaskDesc", e.target.value)}></textarea>
        {
          // контейнер с радио-инпутами
        }
        <div className="editForm__radio-block">
          <div className="editForm__radio-wrapper">
            <input
              className="editForm__radio-input editForm__radio-input--waiting"
              type="radio"
              name="status"
              id="radio-input-1"
              value="waiting"
              onChange={e => {
                props.formStateHandler("setTaskStatus", e.target.value);
                setSelectedStatus(e.target.value);
              }}
              checked={selectedStatus === "waiting"}></input>
            <label className="editForm__radio-label" htmlFor="radio-input-1">
              Ожидает
            </label>
          </div>
          <div className="editForm__radio-wrapper">
            <input
              className="editForm__radio-input editForm__radio-input--processing"
              type="radio"
              name="status"
              id="radio-input-2"
              value="processing"
              onChange={e => {
                props.formStateHandler("setTaskStatus", e.target.value);
                setSelectedStatus(e.target.value)
              }}
              checked={selectedStatus === "processing"}></input>
            <label className="editForm__radio-label" htmlFor="radio-input-2">
              В процессе
            </label>
          </div>
          <div className="editForm__radio-wrapper">
            <input
              className="editForm__radio-input editForm__radio-input--done"
              type="radio"
              name="status"
              id="radio-input-3"
              value="done"
              onChange={e => {
                props.formStateHandler("setTaskStatus", e.target.value);
                setSelectedStatus(e.target.value)
              }}
              checked={selectedStatus === "done"}></input>
            <label className="editForm__radio-label" htmlFor="radio-input-3">
              Выполнена
            </label>
          </div>
        </div>
        {
          // контейнер с кнопками "отправки" и сброса, последняя
          // устанавливает значения и сбрасывает форму
        }
        <div className="editForm__btn-block">
          <input className="editForm__submit-btn" type="submit" value="Сохранить"></input>
          <input className="editForm__reset-btn" type="reset" 
            value="Отмена"
            onClick={() => {
              props.stateHandler("setIsEditing", false);
              props.stateHandler("setIsAdding", false);
              props.stateHandler("setCurrentTask", -1);
              props.stateHandler("setEditingTaskId", -1);
              props.formStateHandler("resetForm", 0);
            }}></input>
        </div>
      </fieldset>
    </form>
  )
}

export default EditForm;