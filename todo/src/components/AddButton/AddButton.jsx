import "./_addButton.sass";

function AddButton(props) {
  console.log(props);
  return (
    <button onClick={() => {props.toggleAdding(true); props.toggleEditing(true); props.toggleWatching(false)}}>Добавить</button>
  )
}

export default AddButton;