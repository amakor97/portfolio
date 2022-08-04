import { useState } from "react";

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

  console.log("current task base:", tasksBase);

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
    setTask(newTasksBase);
  } 

  function deleteTask(id) {
    let task = findTaskById(id, tasksBase);
    console.log("task to delete:", task);
    let index = tasksBase.indexOf(task);
    console.log("TTD index:", index);
    let newTasksBase = tasksBase;
    console.log("NTB before", newTasksBase);
    newTasksBase.splice(index, 1);
    console.log("NTB after", newTasksBase);
    setTask([...newTasksBase]);
    console.log("TB after:", tasksBase);
  }

  function toggleEditing(bool) {
    setIsEditing(bool);
    console.log(`change isEditing to: ${bool}`);
  }

  function toggleAdding(bool) {
    setIsAdding(bool);
    console.log(`change isAdding to: ${bool}`);
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

  let test = [
    {
      id: 1,
      text: "abc"
    }
  ]

  console.log({currentTaskId});
  findTaskById(1, test);

  return (
    <div className="todoContainer">
      <ListContainer tasks={tasksBase} updateId={updateCurrentTaskId} toggleEditing={toggleEditing} toggleAdding={toggleAdding} deleteTask={deleteTask}/>
      <EditContainer task={tasksBase.length > 0 ? findTaskById(currentTaskId, tasksBase) : -1} editTask={editTask} toggleEditing={toggleEditing} isEditing={isEditing} isAdding={isAdding}/>
    </div>
  )
}

export default TodoContainer;