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
        return {
          ...state,
          tasksBase: action.tasksBase
        };
      }
      case "SETISEDITING": {
        return {
          ...state,
          isEditing: action.isEditing
        };
      }
      case "SETISADDING": {
        return {
          ...state,
          isAdding: action.isAdding
        };
      }
      case "SETISWATCHING": {
        return {
          ...state,
          isWatching: action.isWatching
        };
      }
      case "SETREGEX": {
        return {
          ...state,
          searchRegEx: action.searchRegEx
        };
      }
      case "SETISFORMRESETED": {
        return {
          ...state,
          isFormReseted: action.isFormReseted
        };
      }
      case "SETEDITINGTASKID": {
        return {
          ...state,
          editingTaskId: action.editingTaskId
        };
      }
      case "SETREALCURRENTTASK": {
        return {
          ...state,
          realCurrentTask: action.realCurrentTask
        };
      }
      default:
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

        switch(universal) {
          case -1: {
            dispatch({ type: actionType, realCurrentTask: undefined });
            break;
          }
          case 0: {
            dispatch({ type: actionType, realCurrentTask: {} });
            break;
          }
          default: {
            dispatch({ type: actionType, realCurrentTask: findTaskById(universal, todoList.tasksBase) });
            break;
          }
        }
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
        break;
      }
      case 0: {
        break;
      }
      default: {
      }
    }
  }

  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      stateHandler("SETTASKSBASE", [...tmpBase]);
    }
  }, [])

  function editTask(taskData) {
    let newTasksBase = [];

    if (todoList.isAdding === true) {
      stateHandler("SETISADDING", false);

      newTasksBase = todoList.tasksBase;
      newTasksBase.push(taskData);
    } else {
      newTasksBase = todoList.tasksBase.map(obj => {
        if (obj.id === taskData.id) {
          obj = JSON.parse(JSON.stringify(taskData));
          return obj;
        }
        return obj;
      })
    }
    writeLocalStorage(newTasksBase);
    stateHandler("SETTASKSBASE", newTasksBase);
  } 

  function deleteTask(id) {
    let task = findTaskById(id, todoList.tasksBase);
    let index = todoList.tasksBase.indexOf(task);

    let newTasksBase = todoList.tasksBase;
    newTasksBase.splice(index, 1);
    if (newTasksBase.length === 0) {
      localStorage.clear();
    } else {
      writeLocalStorage(newTasksBase);
    }

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

          //tasks={tasksBase} 
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
          todoList={todoList}
          stateHandler={stateHandler}

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