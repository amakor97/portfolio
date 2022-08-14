import React, { memo} from "react";

import "./_watchContainer.sass"

const WatchContainer = React.memo((props) => {
  return(
    <div className="watchContainer">
      <p className="watchContainer__title">{props.todoList.realCurrentTask.name}</p>
          <p className="watchContainer__desc">{props.todoList.realCurrentTask.desc}</p>
          <p>{props.todoList.realCurrentTask.status}</p>
          <button onClick={() => {
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