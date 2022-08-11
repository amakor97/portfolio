import "./_addButton.sass";

function AddButton(props) {
  return (
    <button onClick={() => {
      props.setIsAdding(true); 
      
      props.stateHandler("SETISADDING", true);

      props.setIsEditing(true); 

      props.stateHandler("SETISEDITING", true);

      props.setIsWatching(false);

      props.stateHandler("SETISWATCHING", false);

      props.setIsFormReseted(false); 

      props.stateHandler("SETISFORMRESETED", false);

      props.updateTask(0);
    
      props.stateHandler("SETREALCURRENTTASK", 0);
    }

      
    }>Добавить
    </button>
  )
}

export default AddButton;