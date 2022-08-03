import "./_task.sass";

function Task(props) {
  console.log("Task");
  console.log(props.task);
  return (
    <div className="task" onClick={() => {console.log(props.task.id)}}>
      <span>{props.task.id}</span>
      <span>{props.task.text}</span>
    </div>
  );
}

export default Task;