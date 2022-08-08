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
  console.log(searchRegEx);
  //etSearchRegEx("First");

  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth);
  }, []);

  const [tdWidth, setTdWidth] = useState(0);

  window.addEventListener("resize", function() {
    setTdWidth(ref.current.offsetWidth);
  })

  const [realCurrentTask, setRealCurrentTask] = useState({});

  function updateRealCurrentTask(id) {
    console.log("changing current task to one with id:", id);
    let tmpTask = undefined;

    switch(id) {
      case -1: {
        console.log("no task is going to be worked with");
        tmpTask = undefined;
        break;
      }
      case 0: {
        console.log("empty task is going to be added");
        tmpTask = {};
        break;
      }
      default: {
        console.log("task is going to be edited");
        tmpTask = findTaskById(id, tasksBase);
        console.log(tmpTask);
      }
    }
    setRealCurrentTask(tmpTask);
  }


  console.log("current task base:", tasksBase);

  useEffect(() => {
    const tmpBase = readLocalStorage();
    console.log(tmpBase);
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
      console.log("need to add task!");
      setIsAdding(false);
      setCurrentTaskId(taskData.id);
      newTasksBase = tasksBase;
      console.log("NTB before", newTasksBase);
      newTasksBase.push(taskData);
      console.log("NTB after", newTasksBase);
    } else {
      newTasksBase = tasksBase.map(obj => {
        if (obj.id === taskData.id) {
          console.log(obj.id);
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
    console.log("task to delete:", task);
     
    console.log({realCurrentTask});
  
    if (typeof(realCurrentTask) === "object") {
      if (id === realCurrentTask.id) {
        console.log("MATCHED!!");
        console.log("need to delete edit form");
        setRealCurrentTask(-1);
        setIsEditing(false);

        console.log(realCurrentTask);
      }
    }

    if (id === realCurrentTask) {

    }

    let index = tasksBase.indexOf(task);
    console.log("TTD index:", index);
    let newTasksBase = tasksBase;
    console.log("NTB before", newTasksBase);
    newTasksBase.splice(index, 1);
    console.log("NTB after", newTasksBase);
    if (newTasksBase.length === 0) {
      console.log("EMPTY");
      localStorage.clear();
    } else {
      writeLocalStorage(newTasksBase);
    }

    setTask([...newTasksBase]);
    console.log("TB after:", tasksBase);

    if (isEditing === true) {
      setRealCurrentTask(findTaskById(currentTaskId));
    }
  }

  function toggleEditing(bool) {
    setIsEditing(bool);
    console.log(`change isEditing to: ${bool}`);
  }

  function toggleAdding(bool) {
    setIsAdding(bool);
    console.log(`change isAdding to: ${bool}`);
  }

  function toggleWatching(bool) {
    setIsWatching(bool);
    console.log(`change isWatching to: ${bool}`);
  }

  function findTaskById(id, arr) {
    console.log({id});
    console.log({arr});
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        console.log(arr[i]);
        return arr[i];
      }
    }
  }

  console.log({realCurrentTask});

  function writeLocalStorage(arr) {
    //const tasksBaseStringed = tasksBase.toString();
    const tasksBaseStringed = JSON.stringify(arr);
    console.log(tasksBaseStringed);
    localStorage.setItem("tasks", tasksBaseStringed);
  }


  function readLocalStorage() {
    let tmpBase = localStorage.getItem("tasks");
    console.log({tmpBase});
    tmpBase = JSON.parse(tmpBase);
    console.log({tmpBase});
    return tmpBase;
  }

  console.log("tasks base len:", tasksBase.length);

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
      />
    </div>
  )
}

export default TodoContainer;