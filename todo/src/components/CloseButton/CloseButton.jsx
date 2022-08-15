import { memo } from "react";

import "./_closeButton.sass";

function closeButton(props) {
  return (
    <button className={"closeButton " + 
    (props.className ? props.className : "")} 
      onClick={() => {
        props.stateHandler("setIsWatching", false);
        props.stateHandler("setCurrentTask", -1);
        props.formStateHandler("resetForm", 0);
      }}>
      Скрыть
    </button>
  )
}

export default memo(closeButton);