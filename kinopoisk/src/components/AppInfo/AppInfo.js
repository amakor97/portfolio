import "./_appInfo.sass";

import "../RegularBtn/RegularBtn"
import RegularBtn from "../RegularBtn/RegularBtn";

function captureClick(e) {
  e.stopPropagation();
}

function AppInfo(props) {
  console.log(props.closeAbout);
  return (
    <div className="App-Info" onClick={captureClick}>
      <h2 className="App-Info__title">Информация о приложении</h2>
      <p className="App-Info__text">"Кинопоиск топ 250" - веб-приложение для 
        быстрого просмотра информации о лучших фильмах по версии Кинопоиска.
        По клику на постер фильма будет выведена следующая информация:
      </p>
      <ul className="App-Info__list">
        <li className="App-Info__li">Постер в высоком разрешении;</li>
        <li className="App-Info__li">Позиция в топе Кинопоиска;</li>
        <li className="App-Info__li">Рейтинг Кинопоиска;</li>
        <li className="App-Info__li">Год выпуска;</li>
        <li className="App-Info__li">Слоган (если присутствует);</li>
        <li className="App-Info__li">Название;</li>
        <li className="App-Info__li">Описание;</li>
        <li className="App-Info__li">Ссылка на страницу фильма на Кинопоиске.</li>
      </ul>
      <p className="App-Info__text">При создании приложения использовались следующие технологии:</p>
      <ul className="App-Info__list">
        <li className="App-Info__li">Внешний API (
          <a className="App-Info__link" 
            href="https://kinopoiskapiunofficial.tech/documentation/api/" 
            target="_blank"
            rel="noopener">
            KinopoiskApiUnofficial
          </a>
          );
        </li>
        <li className="App-Info__li">ReactJS;</li>
        <li className="App-Info__li">SASS.</li>
      </ul>
      <RegularBtn className="App-Info__btn" text="Закрыть" action={props.closeAbout}/>
    </div>
  )
}

export default AppInfo;