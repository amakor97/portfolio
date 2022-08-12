import "./_addButton.sass";

function AddButton(props) {
  return (
    <button 
      className={"addButton " + (props.className ? props.className : "")} 
      onClick={() => {
      props.stateHandler("SETISADDING", true);
      props.stateHandler("SETISEDITING", true);
      props.stateHandler("SETISWATCHING", false);
      props.stateHandler("SETISFORMRESETED", false);
      props.stateHandler("SETREALCURRENTTASK", 0);
    }}>
      Добавить
    </button>
  )
}

export default AddButton;