import { useState, useEffect, useRef, useLayoutEffect, useReducer, useCallback} from "react";

import ListContainer from "../ListContainer/ListContainer";
import WorkContainer from "../WorkContainer/WorkContainer";

import "./_todoContainer.sass";

function TodoContainer() {
  //два объекта для useReducer: с общей информацией
  //по списку и для временного хранения полей формы

  const initialTodoList = {
    tasksBase: [],         // массив с задачами
    isEditing: false,      // редактируется ли задача
    isAdding: false,       // добавляется ли задача
    isWatching: false,     // просматривается ли задача
    searchRegEx: ".*",     // регулярное выражение для поиска
    editingTaskId: 0,      // id редактируемой задачи
    currentTask: {}        // объект с текущей задачей
  };

  const initialFormData = {
    taskName: "",          // название, описание и статус
    taskDesc: "",
    taskStatus: ""
  };

  const reducer = (state, action) => {

    //отбрасить "set" и перевести следующую букву в нижний регистр,
    //чтобы получить название свойства из action.type

    let key = action.type.toString().slice(3);
    key = `${key[0].toLowerCase()}${key.slice(1)}`;
    switch(action.type) {
      case "setCurrentTask": {
        // устанавливить currentTask = undefined, 
        // если не производится никаких действий
        switch(action.value) {
          case -1: {
            return {
              ...state,
              [key]: undefined
            }
          }
          // = пустой объект, если идёт добавление задачи
          case 0: {
            return {
              ...state,
              [key]: {}
            }
          }
          // или найти задачу в массиве, если идёт её просмотр
          // или редактирование
          default: {
            return {
              ...state,
              [key]: findTaskById(action.value, state.tasksBase)
            }
          }
        }
      }
      // обнулить значения формы
      case "resetForm": {
        return {
          ...state,
          taskName: "",
          taskDesc: "",
          taskStatus: ""
        };
      }
      // в остальных случаях вернуть объект с изменённым свойством
      // key
      default: {
        return {
          ...state,
          [key]: action.value
        }
      }
    }
  }


  // объекты и функции для работы с ними 
  const [todoList, dispatch] = useReducer(reducer, initialTodoList);
  const [formData, formDispatch] = useReducer(reducer, initialFormData); 

  const stateHandler = useCallback((actionType, universal) => { 
    dispatch({ type: actionType, value: universal});
  }, [])

  const formStateHandler = useCallback((actionType, universal) => {
    formDispatch({ type: actionType, value: universal});
  }, []) 

  // ширина общего контейнера и списка задач
  const [tdWidth, setTdWidth] = useState("700");
  const [lcWidth, setLcWidth] = useState("100%");
  const ref = useRef(null);

  // установить ширину контейнера после рендера
  useLayoutEffect(() => {
    setTdWidth(ref.current.offsetWidth - 20);
  }, []);

  // и в случае изменения размеров окна 
  useEffect(() => {
    window.addEventListener("resize", function() {
      setTdWidth(ref.current.offsetWidth - 20);
    })
  }, [])

  // прочитать массив из localStorage 
  useEffect(() => {
    const tmpBase = readLocalStorage();
    if (tmpBase) {
      stateHandler("setTasksBase", [...tmpBase]);
    }
  }, [])


  // функция редактирования или добавления задачи
  function editTask(taskData) {
    // временный массив
    let newTasksBase = [];

    // если isAdding = true, установить его false,
    // копировать список и добавить задачу в конец массива
    if (todoList.isAdding === true) {
      stateHandler("setIsAdding", false);
      newTasksBase = todoList.tasksBase;
      newTasksBase.push(taskData);
    } else {
      // копировать массив через map и 
      // заместить объект с таким же id
      newTasksBase = todoList.tasksBase.map(obj => {
        if (obj.id === taskData.id) {
          obj = JSON.parse(JSON.stringify(taskData));
        }
        return obj;
      })
    }
    // записать массив в localStorage и в основной массив
    writeLocalStorage(newTasksBase);
    stateHandler("setTasksBase", newTasksBase);
  } 

  // функция удаления задачи
  function deleteTask(id) {
    // найти задачу и её индекс по id
    let task = findTaskById(id, todoList.tasksBase);
    let index = todoList.tasksBase.indexOf(task);

    // завести массив, скопировать в него задачи и убрать одну
    let newTasksBase = todoList.tasksBase;
    newTasksBase.splice(index, 1);

    // очистить или записать localStorage 
    if (newTasksBase.length === 0) {
      localStorage.clear();
    } else {
      writeLocalStorage(newTasksBase);
    }

    // записать в основной массив
    stateHandler("setTasksBase", [...newTasksBase]);
  }


  // функция поиска задачи - просмотреть элементы и вернуть элемент
  // в случае совпадения id
  function findTaskById(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return arr[i];
      }
    }
  }

  // запись в localStorage
  function writeLocalStorage(arr) {
    const tasksBaseStringed = JSON.stringify(arr);
    localStorage.setItem("tasks", tasksBaseStringed);
  }

  // чтение localStorage
  function readLocalStorage() {
    let tmpBase = JSON.parse(localStorage.getItem("tasks"));
    return tmpBase;
  }

  // вернуть два основных компонента
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