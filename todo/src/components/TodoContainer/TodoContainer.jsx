import { useState, useEffect, useRef, useLayoutEffect, useReducer, useCallback} from "react";

import ListContainer from "../ListContainer/ListContainer";
import WorkContainer from "../WorkContainer/WorkContainer";

import "./_todoContainer.sass";

function TodoContainer() {
  const initialTodoList = {
    tasksBase: [],
    isEditing: false,
    isAdding: false,
    isWatching: false,
    searchRegEx: ".*",
    editingTaskId: 0,
    currentTask: {}
  };

  const initialFormData = {
    taskName: "",
    taskDesc: "",
    taskStatus: ""
  };

  const reducer = (state, action) => {
    let key = action.type.toString().slice(3);
    key = `${key[0].toLowerCase()}${key.slice(1)}`;
    switch(action.type) {
      case "setCurrentTask": {
        switch(action.value) {
          case -1: {
            return {
              ...state,
              [key]: undefined
            }
          }
          case 0: {
            return {
              ...state,
              [key]: {}
            }
          }
          default: {
            return {
              ...state,
              [key]: findTaskById(action.value, state.tasksBase)
            }
          }
        }
      }
      case "resetForm": {
        return {
          ...state,
          taskName: "",
          taskDesc: "",
          taskStatus: ""
        };
      }
      default: {
        return {
          ...state,
          [key]: action.value
        }
      }
    }
  }

  const [todoList, dispatch] = useReducer(reducer, initialTodoList);
  const [formData, formDispatch] = useReducer(reducer, initialFormData); 

  const stateHandler = useCallback((actionType, universal) => { 
    dispatch({ type: actionType, value: universal});
  }, [])

  const formStateHandler = useCallback((actionType, universal) => {
    formDispatch({ type: actionType, value: universal});
  }, []) 

  const [tdWidth, setTdWidth] = useState("600");
  const [lcWidth, setLcWidth] = useState("100%");
  const ref = useRef(null);

  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth - 20);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", function() {
      setTdWidth(ref.current.offsetWidth - 20);
    })
  }, [])


  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      stateHandler("setTasksBase", [...tmpBase]);
    }
  }, [])

  function editTask(taskData) {
    let newTasksBase = [];

    if (todoList.isAdding === true) {
      stateHandler("setIsAdding", false);
      newTasksBase = todoList.tasksBase;
      newTasksBase.push(taskData);
    } else {
      newTasksBase = todoList.tasksBase.map(obj => {
        if (obj.id === taskData.id) {
          obj = JSON.parse(JSON.stringify(taskData));
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