import { useState, useRef, useLayoutEffect } from "react";

import "./_listContainer.sass";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  const ref = useRef(null);
  
  useLayoutEffect(() => {
    props.setLcWidth(ref.current.offsetWidth);
  })


  const disableselect = (e) => {  
    return false;
  }  
  document.onselectstart = disableselect;

  const [sizeX, setSize] = useState(400);

  const resizer = (mouseDownEvent) => {
    const startSize = sizeX;
    const startPosition = mouseDownEvent.pageX;
    
    function onMouseMove(mouseMoveEvent) {
      
      setSize(() => {
        if (((startSize - startPosition + mouseMoveEvent.pageX) <= 600) &&(startSize - startPosition + mouseMoveEvent.pageX > 50)) {
          props.setLcWidth(startSize - startPosition + mouseMoveEvent.pageX);
          return startSize - startPosition + mouseMoveEvent.pageX;
        } else {
          if ((startSize - startPosition + mouseMoveEvent.pageX) > 600) {
            props.setLcWidth(600);
            return 600;
          }
          if ((startSize - startPosition + mouseMoveEvent.pageX) <= 50) {
            props.setLcWidth(50);
            return 50;
        }}
      });
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };


  let re = new RegExp(props.searchRegEx, 'i');
  return (
    <div className="listContainer" ref={ref} style={{width: sizeX}}>
      <div className="listContainer__resizer" onMouseDown={resizer}></div>
      <SearchFilter setSearchRegEx={props.setSearchRegEx}/>
      <ul>
        {props.tasks.map(task => {
        return (
          re.test(task.text) &&
          <Task 
            key={task.id} 
            task={task} 
            updateId={props.updateId} 
            setIsEditing={props.setIsEditing} 
            deleteTask={props.deleteTask} 
            setIsWatching={props.setIsWatching} 
            setIsAdding={props.setIsAdding}
            updateTask={props.updateTask}
            realCurrentTask={props.realCurrentTask}
            setEditingTaskId={props.setEditingTaskId}
          />
        )}
        )}
      </ul>
      <AddButton 
        setIsAdding={props.setIsAdding} 
        setIsEditing={props.setIsEditing} 
        setIsWatching={props.setIsWatching} 
        setIsFormReseted={props.setIsFormReseted} 
        updateTask={props.updateTask}
      />
    </div>
  )
}

export default ListContainer;