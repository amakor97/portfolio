import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "../../Sass/_reset.sass";
import "../../Sass/_root.sass";
import "./_main.sass";


function Main(props) {
  return (
    <div className="Main" id="main-id">
      <h1 className="Main__title" title="Точное количество фильмов может отличаться">Кинопоиск топ 250*</h1>
      <CardsContainer pageIter={props.pageIter} pagesToFetch={props.pagesToFetch} filmsToRender={props.filmsToRender}/>
    </div>
  )
}

export default Main;