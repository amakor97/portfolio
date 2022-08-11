import { useState, useEffect, useRef, useLayoutEffect, useReducer} from "react";

import "./_todoContainer.sass";

import ListContainer from "../ListContainer/ListContainer";
import EditContainer from "../EditContainer/EditContainer";

function TodoContainer() {

  const initialTodoList = {
    tasksBase: [],
    isEditing: false,
    isAdding: false,
    isWatching: false,
    searchRegEx: ".*",
    isFormReseted: false,
    editingTaskId: 0,
    realCurrentTask: {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SETTASKSBASE": {
        for (const key in state) {
          if (key === "tasksBase") {
            console.log(`prev tasksBase: ${state[key]}`);
            state[key] = action.tasksBase;
            console.log(`new tasksBase: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETISEDITING": {
        for (const key in state) {
          if (key === "isEditing") {
            console.log(`prev isEditing: ${state[key]}`);
            state[key] = action.isEditing;
            console.log(`new isEditing: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETISADDING": {
        for (const key in state) {
          if (key === "isAdding") {
            console.log(`prev isAdding: ${state[key]}`);
            state[key] = action.isAdding;
            console.log(`new isAdding: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETISWATCHING": {
        for (const key in state) {
          if (key === "isWatching") {
            console.log(`prev isWatching: ${state[key]}`);
            state[key] = action.isWatching;
            console.log(`new isWatching: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETREGEX": {
        for (const key in state) {
          if (key === "searchRegEx") {
            console.log(`prev regex: ${state[key]}`);
            state[key] = action.searchRegEx;
            console.log(`new regex: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETISFORMRESETED": {
        for (const key in state) {
          if (key === "isFormReseted") {
            console.log(`prev isFormReseted: ${state[key]}`);
            state[key] = action.isFormReseted;
            console.log(`new isFormReseted: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETEDITINGTASKID": {
        for (const key in state) {
          if (key === "editingTaskId") {
            console.log(`prev editingTaskId: ${state[key]}`);
            state[key] = action.editingTaskId;
            console.log(`new editingTaskId: ${state[key]}`);
          }
        }
        return state;
      }
      case "SETREALCURRENTTASK": {
        for (const key in state) {
          if (key === "realCurrentTask") {
            console.log(`prev realCurrentTask: ${state[key]}`);
            state[key] = action.realCurrentTask;
            console.log(`new realCurrentTask: ${state[key]}`);
          }
        }
        return state;
      }
      default:
        for (const key in state) {
          console.log(key, state[key]);
        }
        return state;
    }
  }



  const [todoList, dispatch] = useReducer(reducer, initialTodoList);

  const stateHandler = (actionType, universal) => {
    switch(actionType) {
      case "SETTASKSBASE": {
        dispatch({ type: actionType, tasksBase: universal});
        break;
      }
      case "SETISEDITING": {
        dispatch({ type: actionType, isEditing: universal});
        break;
      }
      case "SETISADDING": {
        dispatch({ type: actionType, isAdding: universal});
        break;
      }
      case "SETISWATCHING": {
        dispatch({ type: actionType, isWatching: universal});
        break;
      }
      case "SETREGEX": {
        dispatch({ type: actionType, searchRegEx: universal});
        break;
      }
      case "SETISFORMRESETED": {
        dispatch({ type: actionType, isFormReseted: universal});
        break;
      }
      case "SETEDITINGTASKID": {
        dispatch({ type: actionType, editingTaskId: universal});
        break;
      }
      case "SETREALCURRENTTASK": {
        dispatch({ type: actionType, realCurrentTask: universal});
        break;
      }
      default:
        return;
    }
  }

  function testReducer() {
    stateHandler("SETISEDITING", true);
    stateHandler("SETISADDING", true);
    stateHandler("SETISWATCHING", true);
    stateHandler("SETISFORMRESETED", true);
    stateHandler("SETEDITINGTASKID", 123);
    stateHandler("SETREALCURRENTTASK", -1);
    stateHandler("SETREGEX", "abc");
  }

  useEffect(() => {
    //testReducer();
  }, [])


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
      stateHandler("SETTASKSBASE", [...tmpBase]);
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
    stateHandler("SETTASKSBASE", newTasksBase);
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
    stateHandler("SETTASKSBASE", [...newTasksBase]);
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
          todoList={todoList}
          stateHandler={stateHandler}

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