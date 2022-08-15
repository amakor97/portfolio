import { memo } from "react";

import "./_addButton.sass";

function AddButton(props) {
  return (
    // вернуть кнопку, классы получить на основе пропсов
    <button 
      className={"addButton " + 
        (props.className ? props.className : "")} 
      onClick={() => {
        //установить значения, вызвать очистку формы
        props.stateHandler("setIsAdding", true);
        props.stateHandler("setIsEditing", true);
        props.stateHandler("setIsWatching", false);
        props.stateHandler("setCurrentTask", {});
        props.formStateHandler("resetForm", 0);
      }}>
      Добавить
    </button>
  )
}

export default memo(AddButton);