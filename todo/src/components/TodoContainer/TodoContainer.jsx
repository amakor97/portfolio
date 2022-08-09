import { useState, useEffect, useRef, useLayoutEffect } from "react";

import "./_todoContainer.sass";

import ListContainer from "../ListContainer/ListContainer";
import EditContainer from "../EditContainer/EditContainer";

const tasks = [
  {
    id: 1,
    text: "something",
  },
  {
    id: 2,
    text: "another",
  },
  {
    id: 3,
    text: "lorem",
  },
  {
    id: 4,
    text: "xexexe",
  }
]

function TodoContainer() {
  const [currentTaskId, setCurrentTaskId] = useState(1);
  const [tasksBase, setTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [searchRegEx, setSearchRegEx] = useState(".*");
  const [isFormRes, setIsFormRes] = useState(false);

  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth);
  }, []);

  const [tdWidth, setTdWidth] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(0);

  window.addEventListener("resize", function() {
    setTdWidth(ref.current.offsetWidth);
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
      setTask([...tmpBase]);
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
    setTask(newTasksBase);
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

    setTask([...newTasksBase]);

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
        setIsFormRes={setIsFormRes}
        updateTask={updateRealCurrentTask}
        realCurrentTask={realCurrentTask}
        tdWidth={tdWidth}
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
        setIsFormRes={setIsFormRes} 
        isFormRes={isFormRes}
        updateTask={updateRealCurrentTask}
        realCurrentTask={realCurrentTask}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
      />
    </div>
  )
}

export default TodoContainer;