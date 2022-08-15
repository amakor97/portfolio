import { memo } from "react";

import "./_addButton.sass";

function AddButton(props) {
  return (
    <button 
      className={"addButton " + (props.className ? props.className : "")} 
      onClick={() => {
      props.stateHandler("setIsAdding", true);
      props.stateHandler("setIsEditing", true);
      props.stateHandler("setIsWatching", false);
      props.stateHandler("setCurrentTask", 0);
      props.formStateHandler("resetForm", 0);
    }}>
      Добавить
    </button>
  )
}

export default memo(AddButton);