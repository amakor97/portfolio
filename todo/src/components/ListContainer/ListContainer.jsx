import { useRef, useLayoutEffect} from "react";

import "./_listContainer.sass";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  const ref = useRef(null);
  console.log(props.tdWidth);
  //console.log(props.lcWidth);
  const minWidth = props.tdWidth*0.35;
  console.log({minWidth});
  const maxWidth = props.tdWidth*0.65;
  console.log({maxWidth});
  
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


  let re = new RegExp(props.todoList.searchRegEx, 'i');
  return (
    <div className="listContainer" ref={ref} style={{width: props.lcWidth}}>
      <div className="listContainer__resizer" onMouseDown={resizer}></div>
      <SearchFilter stateHandler={props.stateHandler}/>
      <ul>
        {props.todoList.tasksBase.map(task => {
        return (
          re.test(task.name) &&
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