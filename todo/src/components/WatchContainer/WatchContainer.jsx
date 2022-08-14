import React, { memo} from "react";

import "./_watchContainer.sass"

const WatchContainer = React.memo((props) => {
  let stat = undefined;
  let statClass = undefined;
  switch (props.todoList.realCurrentTask.status) {
    case "waiting": {
      stat = "Ожидает";
      statClass = "watchContainer__status--waiting";
      break;
    }
    case "processing": {
      stat = "В процессе";
      statClass = "watchContainer__status--processing";
      break;
    }
    case "done": {
      stat = "Выполнена";
      statClass = "watchContainer__status--done";
      break;
    }
    default: {
      break;
    }
  }

  return(
    <div className="watchContainer">
      <p className="watchContainer__title">{props.todoList.realCurrentTask.name}</p>
          <p className="watchContainer__desc">{props.todoList.realCurrentTask.desc}</p>
          <p className={`watchContainer__status ${statClass}`}>{stat}</p>
          <button className="watchContainer__close-btn" 
            onClick={() => {
            props.stateHandler("setIsWatching", false);
            props.stateHandler("setRealCurrentTask", -1);
            props.formStateHandler("resetForm", 0);
          }}>
            Скрыть
          </button>
    </div>
  );
})

export default memo(WatchContainer);