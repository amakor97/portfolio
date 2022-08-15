import { memo } from "react";

import "./_closeButton.sass";

function closeButton(props) {
  return (
    <button className="watchContainer__close-btn" onClick={() => {
      props.stateHandler("setIsWatching", false);
      props.stateHandler("setRealCurrentTask", -1);
      props.formStateHandler("resetForm", 0);
    }}>
      Скрыть
    </button>
  )
}

export default memo(closeButton);