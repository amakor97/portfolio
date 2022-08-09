import { useState, useEffect, useRef, useLayoutEffect } from "react";

import "./_todoContainer.sass";

import ListContainer from "../ListContainer/ListContainer";
import EditContainer from "../EditContainer/EditContainer";

function TodoContainer() {
  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const [tasksBase, setTaskBase] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [searchRegEx, setSearchRegEx] = useState(".*");
  const [isFormReseted, setIsFormReseted] = useState(false);

  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth);
  }, []);

  const [tdWidth, setTdWidth] = useState(0);
  const [lcWidth, setLcWidth] = useState("100%");
  const [editingTaskId, setEditingTaskId] = useState(0);

  window.addEventListener("resize", function() {
    //setTdWidth(ref.current.offsetWidth);
  })

  const [realCurrentTask, setRealCurrentTask] = useState({});

  function updateRealCurrentTask(id) {
    let tmpTask = undefined;

    switch(id) {
      case -1: {
        tmpTask = undefined;
        break;
      }
      case 0: {
        tmpTask = {};
        break;
      }
      default: {
        tmpTask = findTaskById(id, tasksBase);
      }
    }
    setRealCurrentTask(tmpTask);
  }

  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      setTaskBase([...tmpBase]);
    }
  }, [])

  function updateCurrentTaskId(num) {
    setCurrentTaskId(num);
  }

  function editTask(taskData) {

    let newTasksBase = [];

    if (isAdding === true) {
      setIsAdding(false);
      setCurrentTaskId(taskData.id);
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
    setTaskBase(newTasksBase);
  } 

  function deleteTask(id) {
    let task = findTaskById(id, tasksBase);
  
    if (typeof(realCurrentTask) === "object") {
      if (id === realCurrentTask.id) {
        setRealCurrentTask(-1);
        setIsEditing(false);
      }
    }

    let index = tasksBase.indexOf(task);
    let newTasksBase = tasksBase;
    newTasksBase.splice(index, 1);
    if (newTasksBase.length === 0) {
      localStorage.clear();
    } else {
      writeLocalStorage(newTasksBase);
    }

    setTaskBase([...newTasksBase]);

    if (isEditing === true) {
      setRealCurrentTask(findTaskById(currentTaskId));
    }
  }

  function toggleEditing(bool) {
    setIsEditing(bool);
  }

  function toggleAdding(bool) {
    setIsAdding(bool);
  }

  function toggleWatching(bool) {
    setIsWatching(bool);
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
    let tmpBase = localStorage.getItem("tasks");
    tmpBase = JSON.parse(tmpBase);
    return tmpBase;
  }

  return (
    <div className="todoContainer" ref={ref}>
      <ListContainer 
        tasks={tasksBase} 
        updateId={updateCurrentTaskId} 
        toggleEditing={toggleEditing} 
        toggleAdding={toggleAdding} 
        deleteTask={deleteTask} 
        toggleWatching={toggleWatching} 
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
        toggleEditing={toggleEditing} 
        isEditing={isEditing} 
        isAdding={isAdding} 
        isWatching={isWatching} 
        toggleWatching={toggleWatching} 
        toggleAdding={toggleAdding} 
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