import { useState, useRef, useLayoutEffect } from "react";

import "./_listContainer.sass";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

function ListContainer(props) {
  const ref = useRef(null);
  const [lcWidth, setLcWidth] = useState("100%");
  const [posX, setPosX] = useState(0);
  
  useLayoutEffect(() => {
    setLcWidth(ref.current.offsetWidth);
    setPosX(ref.current.offsetLeft);
  })

  function resize(e) {
    setLcWidth(e.clientX - posX);
  }


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
          return startSize - startPosition + mouseMoveEvent.pageX;
        } else {
          if ((startSize - startPosition + mouseMoveEvent.pageX) > 600) {
            return 600;
          }
          if ((startSize - startPosition + mouseMoveEvent.pageX) <= 50) {
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
            toggleEditing={props.toggleEditing} 
            deleteTask={props.deleteTask} 
            toggleWatching={props.toggleWatching} 
            toggleAdding={props.toggleAdding}
            updateTask={props.updateTask}
            realCurrentTask={props.realCurrentTask}
            setEditingTaskId={props.setEditingTaskId}
            />
        )}
        )}
      </ul>
      <AddButton toggleAdding={props.toggleAdding} toggleEditing={props.toggleEditing} toggleWatching={props.toggleWatching} setIsFormRes={props.setIsFormRes} updateTask={props.updateTask}/>
    </div>
  )
}

export default ListContainer;