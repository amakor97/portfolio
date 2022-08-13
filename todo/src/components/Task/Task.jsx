import "./_task.sass";

function Task(props) {
  return (
    <div className={"task " + (props.className ? props.className : "") + (` task--${props.task.status}`)}>
      <span className="task__name">{props.task.text}</span>
      <div className="task__btn-wrapper">
        <button className="task__btn" onClick={() => {
          props.stateHandler("setIsWatching", true);
          props.stateHandler("setIsEditing", false);
          props.stateHandler("setIsAdding", false);
          props.stateHandler("setRealCurrentTask", props.task.id);
          props.stateHandler("setEditingTaskId", -1);
          }}>
            <svg className="task__btn-svg" viewBox="0 0 64 64" >
              <path d="M32.513,13.926c10.574,0.15 19.249,9.657 23.594,17.837c0,0 -1.529,3.129 -2.963,5.132c-0.694,0.969 -1.424,1.913 -2.191,2.826c-0.547,0.65 -1.112,1.283 -1.698,1.898c-5.237,5.5 -12.758,9.603 -20.7,8.01c-8.823,-1.77 -16.02,-9.33 -20.346,-17.461c0,0 1.536,-3.132 2.978,-5.132c0.646,-0.897 1.324,-1.77 2.034,-2.617c0.544,-0.649 1.108,-1.282 1.691,-1.897c4.627,-4.876 10.564,-8.63 17.601,-8.596Zm-0.037,4c-5.89,-0.022 -10.788,3.267 -14.663,7.35c-0.527,0.555 -1.035,1.127 -1.527,1.713c-0.647,0.772 -1.265,1.569 -1.854,2.386c-0.589,0.816 -1.193,1.846 -1.672,2.721c3.814,6.409 9.539,12.198 16.582,13.611c6.563,1.317 12.688,-2.301 17.016,-6.846c0.529,-0.555 1.04,-1.128 1.534,-1.715c0.7,-0.833 1.366,-1.694 1.999,-2.579c0.586,-0.819 1.189,-1.851 1.667,-2.727c-3.958,-6.625 -10.73,-13.784 -19.082,-13.914Z"/>
              <path d="M32.158,23.948c4.425,0 8.018,3.593 8.018,8.017c0,4.425 -3.593,8.017 -8.018,8.017c-4.424,0 -8.017,-3.592 -8.017,-8.017c0,-4.424 3.593,-8.017 8.017,-8.017Zm0,4.009c2.213,0 4.009,1.796 4.009,4.008c0,2.213 -1.796,4.009 -4.009,4.009c-2.212,0 -4.008,-1.796 -4.008,-4.009c0,-2.212 1.796,-4.008 4.008,-4.008Z"/>
            </svg>
          </button>
        <button className="task__btn task__btn-edit"onClick={() => {
          props.stateHandler("setIsWatching", false);
          props.stateHandler("setIsEditing", true);
          props.stateHandler("setIsAdding", false);
          props.stateHandler("setRealCurrentTask", props.task.id);
          props.stateHandler("setEditingTaskId", props.task.id);
        }}>
          <svg className="task__btn-svg" viewBox="0 0 306.637 306.637">
            <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896 l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"/>
            <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095 L265.13,75.602L231.035,41.507z"/>
          </svg>
        </button>
        <button className="task__btn" onClick={() => {
          if (props.todoList.realCurrentTask) {
            if (props.task.id === props.todoList.realCurrentTask.id) {
              props.stateHandler("setIsWatching", false);
              props.stateHandler("setIsEditing", false);
              props.stateHandler("setRealCurrentTask", -1);
              props.stateHandler("setEditingTaskId", -1);
            } else {
            }
          }
          props.deleteTask(props.task.id);
        }}>
          <svg className="task__btn-svg" width="100%" height="100%" viewBox="0 0 32 32">
            <rect height="12" width="2" x="15" y="12"/>
            <rect height="12" width="2" x="19" y="12"/>
            <rect height="12" width="2" x="11" y="12"/>
            <path d="M20,6V5a3,3,0,0,0-3-3H15a3,3,0,0,0-3,3V6H4V8H6V27a3,3,0,0,0,3,3H23a3,3,0,0,0,3-3V8h2V6ZM14,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H14ZM24,27a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V8H24Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Task;