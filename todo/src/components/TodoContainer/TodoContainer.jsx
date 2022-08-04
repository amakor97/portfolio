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

  function updateCurrentTaskId(num) {
    console.log(`setting current task id: ${num}`);
    setCurrentTaskId(num);
  }

  function editTask(taskData) {
    console.log(`retrieved id: ${taskData.id}`);
    console.log(`retrieved text: ${taskData.text}`);

    let newTasksBase = [];

    if (isAdding === true) {
      console.log("need to add task!");
      setIsAdding(false);
      newTasksBase = tasksBase;
      newTasksBase.push(taskData);
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
    console.log(newTasksBase);
    setTask(newTasksBase);
  } 

  function toggleEditing(bool) {
    setIsEditing(bool);
    console.log(`change isEditing to: ${bool}`);
  }

  function toggleAdding(bool) {
    setIsAdding(bool);
    console.log(`change isAdding to: ${bool}`);
  }

  return (
    <div className="todoContainer">
      <ListContainer tasks={tasksBase} updateId={updateCurrentTaskId} toggleEditing={toggleEditing} toggleAdding={toggleAdding}/>
      <EditContainer task={tasks[currentTaskId-1]} editTask={editTask} toggleEditing={toggleEditing} isEditing={isEditing} isAdding={isAdding}/>
    </div>
  )
}

export default TodoContainer;