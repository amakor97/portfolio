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

  function updateCurrentTaskId(num) {
    console.log(`setting current task id: ${num}`);
    setCurrentTaskId(num);
  }

  return (
    <div className="todoContainer">
      <ListContainer tasks={tasks} updateId={updateCurrentTaskId}/>
      <EditContainer task={tasks[currentTaskId-1]}/>
    </div>
  )
}

export default TodoContainer;