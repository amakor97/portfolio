import { useState, useEffect, useContext } from "react";

import "./_filmInfo.sass";



function FilmInfo(props) {
  let [filmData, setFilmData] = useState([]);
  //const props = useContext(FilmContext);
  console.log(props);

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
      console.log(json);
      setFilmData(json);
    })
  }, []);

  return (
    filmData &&
    <div className="FilmInfo">
      <div className="FilmInfo__main-container">
        <div className="FilmInfo__poster-container">
          <div className="FilmInfo__poster-wrapper">
            <img className="FilmInfo__poster-img" src={filmData.posterUrl}/>
          </div>
          <div className="FilmInfo__poster-sub">
            <div className="FilmInfo__poster-pos">
              #{props.cardNumber}
            </div>
            <div className="FilmInfo__poster-rating">
              {filmData.ratingKinopoisk}
            </div>
            <div className="FilmInfo__poster-year">
              {filmData.year}
            </div>
          </div>
        </div>
        <div className="FilmInfo__description-container">
          <p className="FilmInfo__description-slogan">"{filmData.slogan}"</p>
          <p className="FilmInfo__description-title">{filmData.nameRu}</p>
          <p className="FilmInfo__description-text">{filmData.description}</p>
          <a target="_blank" href={`https://www.kinopoisk.ru/film/${filmData.kinopoiskId}/`}>Подробнее</a>
        </div>
      </div>
    </div>
  )
}

export default FilmInfo;