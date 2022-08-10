import { useState, useRef, useLayoutEffect } from "react";

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

  const [sizeX, setSize] = useState(400);

  const resizer = (mouseDownEvent) => {
    const startSize = sizeX;
    const startPosition = mouseDownEvent.pageX;
    
    function onMouseMove(mouseMoveEvent) {
      
      setSize(() => {
        if (((startSize - startPosition + mouseMoveEvent.pageX) <= maxWidth) &&(startSize - startPosition + mouseMoveEvent.pageX > minWidth)) {
          //props.setLcWidth(startSize - startPosition + mouseMoveEvent.pageX);
          return startSize - startPosition + mouseMoveEvent.pageX;
        } else {
          if ((startSize - startPosition + mouseMoveEvent.pageX) > maxWidth) {
            //props.setLcWidth(600);
            return maxWidth;
          }
          if ((startSize - startPosition + mouseMoveEvent.pageX) <= minWidth) {
            //props.setLcWidth(50);
            return minWidth;
        }}
      });

      props.setLcWidth(sizeX);
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