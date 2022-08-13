import "./_addButton.sass";

function AddButton(props) {
  return (
    <button 
      className={"addButton " + (props.className ? props.className : "")} 
      onClick={() => {
      props.stateHandler("setIsAdding", true);
      props.stateHandler("setIsEditing", true);
      props.stateHandler("setIsWatching", false);
      props.stateHandler("setIsFormReseted", false);
      props.stateHandler("setRealCurrentTask", 0);
    }}>
      Добавить
    </button>
  )
}

export default AddButton;