import "./_watchContainer.sass"

function WatchContainer(props) {
  return(
    <div className="watchContainer">
      <p className="watchContainer__title">{props.todoList.realCurrentTask.text}</p>
          <p className="watchContainer__desc">{props.todoList.realCurrentTask.desc}</p>
          <p>{props.todoList.realCurrentTask.status}</p>
          <button onClick={() => {
            props.stateHandler("setIsWatching", false);
            props.stateHandler("setRealCurrentTask", -1);
          }}>
            Скрыть
          </button>
    </div>
  );
}

export default WatchContainer;