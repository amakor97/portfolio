import React, { memo} from "react";

import CloseButton from "../CloseButton/CloseButton";

import "./_watchContainer.sass"

function WatchContainer(props) {
  let stat = undefined;
  let statClass = 
    `watchContainer__status--${props.todoList.currentTask.status}`;
  switch (props.todoList.currentTask.status) {
    case "waiting": {
      stat = "Ожидает";
      break;
    }
    case "processing": {
      stat = "В процессе";
      break;
    }
    case "done": {
      stat = "Выполнена";
      break;
    }
    default: {
      break;
    }
  }

  return(
    <div className="watchContainer">
      <p className="watchContainer__title">{props.todoList.currentTask.name}</p>
      <p className="watchContainer__desc">{props.todoList.currentTask.desc}</p>
      <p className={`watchContainer__status ${statClass}`}>{stat}</p>
      <CloseButton 
        stateHandler={props.stateHandler}
        formStateHandler={props.formStateHandler}
      />
    </div>
  );
}

export default memo(WatchContainer);