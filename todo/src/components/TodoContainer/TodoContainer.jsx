import { useState, useEffect, useRef, useLayoutEffect} from "react";

import "./_todoContainer.sass";

import ListContainer from "../ListContainer/ListContainer";
import EditContainer from "../EditContainer/EditContainer";

function TodoContainer() {
  const [tasksBase, setTasksBase] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [searchRegEx, setSearchRegEx] = useState(".*");
  const [isFormReseted, setIsFormReseted] = useState(false);
  const [tdWidth, setTdWidth] = useState(0);
  const [lcWidth, setLcWidth] = useState("100%");
  const [editingTaskId, setEditingTaskId] = useState(0);
  const [realCurrentTask, setRealCurrentTask] = useState({});
  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth);
  }, []);

  window.addEventListener("resize", function() {
    setTdWidth(ref.current.offsetWidth);
  })

  function updateRealCurrentTask(id) {
    switch(id) {
      case -1: {
        setRealCurrentTask(undefined);
        break;
      }
      case 0: {
        setRealCurrentTask({});
        break;
      }
      default: {
        setRealCurrentTask(findTaskById(id, tasksBase));
      }
    }
  }

  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      setTasksBase([...tmpBase]);
    }
  }, [])

  function editTask(taskData) {
    let newTasksBase = [];

    if (isAdding === true) {
      setIsAdding(false);
      newTasksBase = tasksBase;
      newTasksBase.push(taskData);
    } else {
      newTasksBase = tasksBase.map(obj => {
        if (obj.id === taskData.id) {
          obj = JSON.parse(JSON.stringify(taskData));
          return obj;
        }
        return obj;
      })
    }
    writeLocalStorage(newTasksBase);
    setTasksBase(newTasksBase);
  } 

  function deleteTask(id) {
    let task = findTaskById(id, tasksBase);

    let index = tasksBase.indexOf(task);
    let newTasksBase = tasksBase;
    newTasksBase.splice(index, 1);
    if (newTasksBase.length === 0) {
      localStorage.clear();
    } else {
      writeLocalStorage(newTasksBase);
    }

    setTasksBase([...newTasksBase]);
  }


  function findTaskById(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i];
      }
    }
  }

  function writeLocalStorage(arr) {
    const tasksBaseStringed = JSON.stringify(arr);
    localStorage.setItem("tasks", tasksBaseStringed);
  }


  function readLocalStorage() {
    let tmpBase = JSON.parse(localStorage.getItem("tasks"));
    return tmpBase;
  }

  return (
      <div className="todoContainer" ref={ref}>
        <ListContainer 
          tasks={tasksBase} 
          setIsEditing={setIsEditing} 
          setIsAdding={setIsAdding} 
          deleteTask={deleteTask} 
          setIsWatching={setIsWatching} 
          searchRegEx={searchRegEx} 
          setSearchRegEx={setSearchRegEx} 
          setIsFormReseted={setIsFormReseted}
          updateTask={updateRealCurrentTask}
          realCurrentTask={realCurrentTask}
          tdWidth={tdWidth}
          lcWidth={lcWidth}
          setLcWidth={setLcWidth}
          setEditingTaskId={setEditingTaskId}
        />
        <EditContainer 
          task={realCurrentTask} 
          editTask={editTask} 
          setIsEditing={setIsEditing} 
          isEditing={isEditing} 
          isAdding={isAdding} 
          isWatching={isWatching} 
          setIsWatching={setIsWatching} 
          setIsAdding={setIsAdding} 
          setIsFormReseted={setIsFormReseted} 
          isFormReseted={isFormReseted}
          updateTask={updateRealCurrentTask}
          realCurrentTask={realCurrentTask}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          tdWidth={tdWidth}
          lcWidth={lcWidth}
        />
      </div>
  )
}

export default TodoContainer;