import { useState, useEffect, useContext } from "react";

import "../../Sass/_reset.sass";
import "./_filmInfo.sass";

import "../RegularBtn/RegularBtn";
import RegularBtn from "../RegularBtn/RegularBtn";

function captureClick(e) {
  e.stopPropagation();
}

function FilmInfo(props) {
  let [filmData, setFilmData] = useState([]);

  let styles = {
    "gridTemplateRows": "auto auto 1fr", 
  }

  useEffect(() => {
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${props.filmId}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "109fecb7-71a1-4a6e-a355-a26f2cd3cd52",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.json())
    .then((json) => {
      setFilmData(json);
    })
  }, []);

  useEffect(() => {
    let cont = document.querySelector(".FilmInfo");
    setTimeout(() => cont.classList.remove("FilmInfo--no-visible"), 250);
  })

  return (
    filmData &&
    <div className="FilmInfo FilmInfo--no-visible" onClick={captureClick}>
      <div className={"FilmInfo__main-container " + 
        (filmData.slogan ? "" : "FilmInfo__main-container--no-slogan")}
        >
        <div className="FilmInfo__poster-container">
          <div className="FilmInfo__poster-wrapper">
            <img 
              className="FilmInfo__poster-img" 
              src={filmData.posterUrl}
              alt={`Постер фильма "${filmData.nameRu}"`}
            />
          </div>
          <div className="FilmInfo__poster-sub">
            <div className="FilmInfo__poster-pos">
              <span className="FilmInfo__poster-number" title="Позиция в рейтинге">
                #{props.cardNumber}
              </span>
            </div>
            <div className="FilmInfo__poster-rating" title="Рейтинг">
              <span className="FilmInfo__poster-number">
                {filmData.ratingKinopoisk}
              </span>
              <img 
                className="FilmInfo__poster-rating-icon" 
                src={require("./star.png")}
                alt={`Оценка`}/>
            </div>
            <div className="FilmInfo__poster-year" title="Год выпуска">
            <span className="FilmInfo__poster-number">
              {filmData.year}
            </span>
            </div>
          </div>
        </div>
        {//<div className="FilmInfo__description-container">
}
          {
            filmData.slogan && 
            <p className="FilmInfo__description-slogan">"{filmData.slogan}"</p>
          }
          <p className="FilmInfo__description-title">{filmData.nameRu}</p>
          <p className="FilmInfo__description-text">{filmData.description}</p>
          <div className="FilmInfo__description-nav">
            <a 
              className="FilmInfo__description-link" 
              target="_blank" 
              href={`https://www.kinopoisk.ru/film/${filmData.kinopoiskId}/`}
              rel="noreferrer">
              Страница на Кинопоиске
            </a>
            <RegularBtn 
              text="Закрыть"
              action={props.closeModal}/>
          </div>
          {
        //</div>
          }
      </div>
    </div>
  )
}

export default FilmInfo;