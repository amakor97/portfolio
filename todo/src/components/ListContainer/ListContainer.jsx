import { useRef, useLayoutEffect} from "react";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

import "./_listContainer.sass";

function ListContainer(props) {
  const ref = useRef(null);
  const minWidth = Math.max(props.tdWidth*0.3, 250);
  const maxWidth = props.tdWidth*0.55;
  
  useLayoutEffect(() => {
    props.setLcWidth(ref.current.offsetWidth);
  })

  const disableselect = e => {  
    return false;
  }  
  document.onselectstart = disableselect;

  const resizer = (mouseDownEvent) => {
    const startSize = props.lcWidth;
    const startPosition = mouseDownEvent.pageX;
    
    function onMouseMove(mouseMoveEvent) {
      props.setLcWidth(() => {
        if (((startSize - startPosition + mouseMoveEvent.pageX) <= maxWidth) && (startSize - startPosition + mouseMoveEvent.pageX > minWidth)) {
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


  let reg = new RegExp(props.todoList.searchRegEx, 'i');

  return (
    <div className="listContainer" ref={ref} style={{width: props.lcWidth}}>
      <div className="listContainer__resizer" onMouseDown={resizer}></div>
      <SearchFilter stateHandler={props.stateHandler}/>
        <ul>
          {props.todoList.tasksBase.map(task => {
          return (
            reg.test(task.name) &&
            <Task
              todoList={props.todoList}
              stateHandler={props.stateHandler}
              className="listContainer__task"
              key={task.id} 
              task={task} 
              deleteTask={props.deleteTask}
              formData={props.formData}
              formStateHandler={props.formStateHandler}
            />
          )}
          )}
        </ul>
      <AddButton
        className="listContainer__add-btn"
        stateHandler={props.stateHandler}
        formStateHandler={props.formStateHandler}
      />
    </div>
  )
}

export default ListContainer;