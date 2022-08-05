import "./_listContainer.sass";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  console.log(props);
  console.log("regex", props.searchRegEx);
  //let re = props.searchRegEx;
  
  let re = new RegExp(props.searchRegEx, 'i');
  console.log("re:", re);
  console.log(re === props.searchRegEx);
  return (
    <div className="listContainer">
      <SearchFilter setSearchRegEx={props.setSearchRegEx}/>
      <ul>
        {props.tasks.map(task => {
        return (
          re.test(task.text) &&
          <Task key={task.id} task={task} updateId={props.updateId} toggleEditing={props.toggleEditing} deleteTask={props.deleteTask} toggleWatching={props.toggleWatching} toggleAdding={props.toggleAdding}/>
        )}
        )}
      </ul>
      <AddButton toggleAdding={props.toggleAdding} toggleEditing={props.toggleEditing} toggleWatching={props.toggleWatching} setIsFormRes={props.setIsFormRes}/>
    </div>
  )
}

export default ListContainer;