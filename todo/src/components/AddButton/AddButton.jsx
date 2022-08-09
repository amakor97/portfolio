import "./_addButton.sass";

function AddButton(props) {
  return (
    <button onClick={() => {props.toggleAdding(true); props.toggleEditing(true); props.toggleWatching(false); props.setIsFormReseted(false); props.updateTask(0)}}>Добавить</button>
  )
}

export default AddButton;