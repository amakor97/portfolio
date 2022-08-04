import "./_task.sass";

function Task(props) {
  return (
    <div className="task">
      <span className="task__id">{props.task.id}</span>
      <span className="task__name">{props.task.text}</span>
      <button className="task__btn task__btn-edit"onClick={() => {props.updateId(props.task.id); props.toggleEditing(true)}}>Ред</button>
      <button className="task__btn" onClick={() => {props.deleteTask(props.task.id)}}>Удал</button>
    </div>
  );
}

export default Task;