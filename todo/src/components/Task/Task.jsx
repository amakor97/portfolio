import "./_task.sass";

function Task(props) {
  return (
    <div className="task">
      <span className="task__id">{props.task.id}</span>
      <span className="task__name">{props.task.text}</span>
      <button className="task__btn" onClick={() => {
        props.updateId(props.task.id); props.setIsWatching(true); props.setIsEditing(false); props.setIsAdding(false); props.updateTask(props.task.id); props.setEditingTaskId(-1)}}>Смот</button>
      <button className="task__btn task__btn-edit"onClick={() => {
        props.updateId(props.task.id); 
        props.setIsWatching(false); 
        props.setIsEditing(true); 
        props.setIsAdding(false); 
        props.updateTask(props.task.id)

      }}>Ред</button>
      <button className="task__btn" onClick={() => {
        if (props.realCurrentTask) {
          if (props.realCurrentTask.id) {
          }
          if (props.task.id === props.realCurrentTask.id) {
            props.setIsWatching(false);
            props.setIsEditing(false);
            props.updateTask(-1);
          } else {
          }
        }
          props.deleteTask(props.task.id); 
        }
        }>Удал</button>
    </div>
  );
}

export default Task;