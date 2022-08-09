import "./_task.sass";

function Task(props) {
  return (
    <div className="task">
      <span className="task__id">{props.task.id}</span>
      <span className="task__name">{props.task.text}</span>
      <button className="task__btn" onClick={() => {
        props.updateId(props.task.id); props.toggleWatching(true); props.toggleEditing(false); props.toggleAdding(false); props.updateTask(props.task.id); props.setEditingTaskId(-1)}}>Смот</button>
      <button className="task__btn task__btn-edit"onClick={() => {
        props.updateId(props.task.id); 
        props.toggleWatching(false); 
        props.toggleEditing(true); 
        props.toggleAdding(false); 
        props.updateTask(props.task.id)

      }}>Ред</button>
      <button className="task__btn" onClick={() => {
        console.log("deleting task with id:", props.task.id); 
        console.log("watching task:", props.realCurrentTask);
        if (props.realCurrentTask) {
          if (props.realCurrentTask.id) {
            console.log("watching task id:", props.realCurrentTask.id);
          }
          if (props.task.id === props.realCurrentTask.id) {
            console.log("need to set isWatching to false");
            props.toggleWatching(false);
            props.toggleEditing(false);
            props.updateTask(-1);
          } else {
            console.log("no need to hide watch and edit");
          }
        }

        
        props.deleteTask(props.task.id); 
}
        }>Удал</button>
    </div>
  );
}

export default Task;

//if realTaskId ==