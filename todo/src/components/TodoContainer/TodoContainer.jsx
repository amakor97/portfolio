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
      case "SETTASKBASE": {
        return state;
      }
      case "SETREG": {
        for (const key in state) {
          if (key === "searchRegEx") {
            console.log(`prev regex: ${state[key]}`);
            state[key] = action.searchRegEx;
            console.log(`new regex: ${state[key]}`);
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
      case "SETREGEX": {
        dispatch({ type: actionType, searchRegEx: universal});
        break;
      }
      default:
        return;
    }
  }

  useEffect(() => {
    //stateHandler("SETREGEX", "abc");
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