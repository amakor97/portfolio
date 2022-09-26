import "./_appInfo.sass";

import RegularBtn from "../RegularBtn/RegularBtn";

function AppInfo(props) {
  function captureClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="App-Info" onClick={captureClick}>
      <h2 className="App-Info__title">Информация о приложении</h2>
      <p className="App-Info__text">"Todo list" - приложение для работы со списком задач. Функции приложения:</p>
      <ul className="App-Info__list">
        <li className="App-Info__li">Создание, просмотр, редактирование и удаление задач;</li>
        <li className="App-Info__li">Опциональное определение и редактирование описания и статуса для каждой задачи;</li>
        <li className="App-Info__li">Поиск задач по названию;</li>
        <li className="App-Info__li">Смещение разделителя списка задач и области взаимодействия.</li>
      </ul>
      <p className="App-Info__text">При создании приложения использовались следующие технологии:</p>
      <ul className="App-Info__list">
        <li className="App-Info__li">ReactJS;</li>
        <li className="App-Info__li">SASS.</li>
      </ul>
      <RegularBtn className="App-Info__btn" text="Закрыть" action={props.closeAbout}/>
    </div>
  )
}

export default AppInfo;