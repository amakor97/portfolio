import "./_addButton.sass";

function AddButton(props) {
  return (
    <button onClick={() => {
      props.setIsAdding(true); 
      props.setIsEditing(true); 
      props.setIsWatching(false); 
      props.setIsFormReseted(false); 
      props.updateTask(0)}
    }>Добавить
    </button>
  )
}

export default AddButton;