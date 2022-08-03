import "./_listContainer.sass";

import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  console.log(props.tasks);
  return (
    <div className="listContainer">
      <ul>
        {props.tasks.map(task => <Task task={task}/>)}
        <AddButton />
      </ul>
    </div>
  )
}

export default ListContainer;