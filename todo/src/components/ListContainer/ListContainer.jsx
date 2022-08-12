import { useRef, useLayoutEffect} from "react";

import "./_listContainer.sass";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  const ref = useRef(null);
  const minWidth = 200;
  const maxWidth = 600;
  
  useLayoutEffect(() => {
    props.setLcWidth(ref.current.offsetWidth);
  })

  const disableselect = (e) => {  
    return false;
  }  
  document.onselectstart = disableselect;

  const resizer = (mouseDownEvent) => {
    const startSize = props.lcWidth;
    const startPosition = mouseDownEvent.pageX;
    
    function onMouseMove(mouseMoveEvent) {
      props.setLcWidth(() => {
        if (((startSize - startPosition + mouseMoveEvent.pageX) <= maxWidth) &&(startSize - startPosition + mouseMoveEvent.pageX > minWidth)) {
          return startSize - startPosition + mouseMoveEvent.pageX;
        } else {
          if ((startSize - startPosition + mouseMoveEvent.pageX) > maxWidth) {
            return maxWidth;
          }
          if ((startSize - startPosition + mouseMoveEvent.pageX) <= minWidth) {
            return minWidth;
        }}
      });
    }

    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };


  let re = new RegExp(props.todoList.searchRegEx, 'i');
  return (
    <div className="listContainer" ref={ref} style={{width: props.lcWidth}}>
      <div className="listContainer__resizer" onMouseDown={resizer}></div>
      <SearchFilter stateHandler={props.stateHandler}/>
      <ul>
        {props.todoList.tasksBase.map(task => {
        return (
          re.test(task.text) &&
          <Task
            todoList={props.todoList}
            stateHandler={props.stateHandler}
            className="listContainer__task"
            key={task.id} 
            task={task} 
            deleteTask={props.deleteTask}
          />
        )}
        )}
      </ul>
      <AddButton
        todoList={props.todoList}
        stateHandler={props.stateHandler}
      />
    </div>
  )
}

export default ListContainer;