import "./_task.sass";

function Task(props) {
  return (
    <div className="task" onClick={() => {props.updateId(props.task.id); props.toggleEditing(true)}}>
      <span>{props.task.id}</span>
      <span>{props.task.text}</span>
    </div>
  );
}

export default Task;