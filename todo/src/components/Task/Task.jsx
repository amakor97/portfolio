import "./_task.sass";

function Task(props) {
  console.log("Task");
  console.log(props.task);
  return (
    <div className="task">
      <span>{props.task.id}</span>
      <span>{props.task.text}</span>
    </div>
  );
}

export default Task;