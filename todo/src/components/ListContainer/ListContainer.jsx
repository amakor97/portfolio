import "./_listContainer.sass";

import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  console.log(props);
  return (
    <div className="listContainer">
      <ul>
        {props.tasks.map(task => <Task task={task} updateId={props.updateId} toggleEditing={props.toggleEditing}/>)}
        <AddButton toggleAdding={props.toggleAdding} toggleEditing={props.toggleEditing}/>
      </ul>
    </div>
  )
}

export default ListContainer;