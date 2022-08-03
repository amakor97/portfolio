import "./_listContainer.sass";

import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  return (
    <div className="listContainer">
      <ul>
        {props.tasks.map(task => <Task task={task} updateId={props.updateId}/>)}
        <AddButton />
      </ul>
    </div>
  )
}

export default ListContainer;