import { useState, useEffect, useRef, useLayoutEffect, useReducer} from "react";

import "./_todoContainer.sass";

import ListContainer from "../ListContainer/ListContainer";
import WorkContainer from "../WorkContainer/WorkContainer";

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

  const initialFormData = {
    taskName: "",
    taskDesc: "",
    taskStatus: ""
  };

  const reducer = (state, action) => {
    let key = action.type.toString().slice(3);
    key = `${key[0].toLowerCase()}${key.slice(1)}`;
    return {
      ...state,
      [key]: action.value
    }
  }

  const formReducer = (state, action) => {
    let key = action.type.toString().slice(3);
    key = `${key[0].toLowerCase()}${key.slice(1)}`;
    if (action.type === "resetForm") {
      console.log("reseting form");
      return {
        ...state,
        taskName: "",
        taskDesc: "",
        taskStatus: ""
      };
    } else {
      return {
        ...state,
        [key]: action.value
      }
    }
  }

  const [todoList, dispatch] = useReducer(reducer, initialTodoList);

  const [formData, formDispatch] = useReducer(formReducer, initialFormData); 

  const stateHandler = (actionType, universal) => {
    switch(actionType) {
      case "setRealCurrentTask": {
        switch(universal) {
          case -1: {
            dispatch({ type: actionType, value: undefined });
            break;
          }
          case 0: {
            dispatch({ type: actionType, value: {} });
            break;
          }
          default: {
            dispatch({ type: actionType, value: findTaskById(universal, todoList.tasksBase) });
            break;
          }
        }
        break;
      }
      default: {
        dispatch({ type: actionType, value: universal});
        break;
      }
    }
  }

  const formStateHandler = (actionType, universal) => {
    switch (actionType) {
      case "setTaskName": {
        formDispatch({ type: actionType, value: universal});
        break;
      }
      case "setTaskDesc": {
        formDispatch({ type: actionType, value: universal});
        break;
      }
      case "setTaskStatus": {
        formDispatch({ type: actionType, value: universal});
        break;
      }
      case "resetForm": {
        formDispatch({ type: actionType, value: universal});
        break;
      }
      default:
        break;
    }
  } 



  const [tdWidth, setTdWidth] = useState(0);
  const [lcWidth, setLcWidth] = useState(400);
  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth);
  }, []);

  window.addEventListener("resize", function() {
    setTdWidth(ref.current.offsetWidth);
  })

  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      stateHandler("setTasksBase", [...tmpBase]);
    }
  }, [])

  function editTask(taskData) {
    console.log("received:", taskData);
    let newTasksBase = [];

    if (todoList.isAdding === true) {
      stateHandler("setIsAdding", false);

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
    stateHandler("setTasksBase", newTasksBase);
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

    stateHandler("setTasksBase", [...newTasksBase]);
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

          formData={formData}
          formStateHandler={formStateHandler}

          deleteTask={deleteTask}
          tdWidth={tdWidth}
          lcWidth={lcWidth}
          setLcWidth={setLcWidth}
        />
        <WorkContainer 
          todoList={todoList}
          stateHandler={stateHandler}

          formData={formData}
          formStateHandler={formStateHandler}

          editTask={editTask}
          tdWidth={tdWidth}
          lcWidth={lcWidth}
        />
      </div>
  )
}

export default TodoContainer;

//https://www.w3schools.com/react/react_memo.asp