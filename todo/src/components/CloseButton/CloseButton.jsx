import { memo } from "react";

import "./_closeButton.sass";

function closeButton(props) {
  return (
    // вернуть кнопку, классы получить на основе пропсов
    <button className={"closeButton " + 
    (props.className ? props.className : "")} 
      onClick={() => {
        //установить значения, вызвать очистку формы
        props.stateHandler("setIsWatching", false);
        props.stateHandler("setCurrentTask", undefined);
        props.formStateHandler("resetForm", 0);
      }}>
      Скрыть
    </button>
  )
}

export default memo(closeButton);