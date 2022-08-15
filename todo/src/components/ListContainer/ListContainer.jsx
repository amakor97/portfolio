import { useRef, useLayoutEffect} from "react";

import SearchFilter from "../SearchFilter/SearchFilter";
import Task from "../Task/Task";
import AddButton from "../AddButton/AddButton";

import "./_listContainer.sass";

function ListContainer(props) {
  const ref = useRef(null);

  // минимальная и максимальная ширины
  const minWidth = Math.max(props.tdWidth*0.3, 250);
  const maxWidth = props.tdWidth*0.55;
  
  // установить ширину списка задач после рендера
  useLayoutEffect(() => {
    props.setLcWidth(ref.current.offsetWidth);
  })

  //блокировать выделение текста
  const disableselect = e => {  
    return false;
  }  
  document.onselectstart = disableselect;

  //функция изменения ширины 
  const resizer = (mouseDownEvent) => {

    //начальные размер и стартовая позиция курсора
    const startSize = props.lcWidth;
    const startPosition = mouseDownEvent.pageX;
    
    //изменение ширины при движении мыши с нажатой кнопкой
    function onMouseMove(mouseMoveEvent) {
      props.setLcWidth(() => {
        
        // если в пределах допустимых значений - вернуть
        // изменённую ширину с учётом движения курсора
        if (((startSize - startPosition + mouseMoveEvent.pageX) <= maxWidth) && (startSize - startPosition + mouseMoveEvent.pageX > minWidth)) {
          return startSize - startPosition + mouseMoveEvent.pageX;
        } else {

          // вернуть максимальное или минимальное значения
          if ((startSize - startPosition + mouseMoveEvent.pageX) > maxWidth) {
            return maxWidth;
          }
          if ((startSize - startPosition + mouseMoveEvent.pageX) <= minWidth) {
            return minWidth;
        }}
      });
    }

    // при отпускании кнопки мыши прекратить слежение за курсором
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    
    // при нажатии на кнопку начать слежение
    document.body.addEventListener("mousemove", onMouseMove);
    
    // вызывать функцию onMouseUp и удалить прослушиватель
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  // получить регулярное выражение, нечуствительное к регистру
  let reg = new RegExp(props.todoList.searchRegEx, 'i');

  // вернуть пустой div, который служит вертикальной полосой,
  // SearchFilter, список задач, каждая из которых проверяется на
  // соответсвие регулярному выражению, и кнопку добавления
  return (
    <div className="listContainer" ref={ref} style={{width: props.lcWidth}}>
      <div className="listContainer__resizer" onMouseDown={resizer}></div>
      <SearchFilter stateHandler={props.stateHandler}/>
        <ul>
          {props.todoList.tasksBase.map(task => {
          return (
            reg.test(task.name) &&
            <Task
              todoList={props.todoList}
              stateHandler={props.stateHandler}
              className="listContainer__task"
              key={task.id} 
              task={task} 
              deleteTask={props.deleteTask}
              formData={props.formData}
              formStateHandler={props.formStateHandler}
            />
          )}
          )}
        </ul>
      <AddButton
        className="listContainer__add-btn"
        stateHandler={props.stateHandler}
        formStateHandler={props.formStateHandler}
      />
    </div>
  )
}

export default ListContainer;