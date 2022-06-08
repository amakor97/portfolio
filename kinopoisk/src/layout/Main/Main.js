import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./_main.sass";

function Main(props) {
  return (
    <div className="Main" id="main-id">
      <CardsContainer pageIter={props.pageIter} pagesToFetch={props.pagesToFetch} filmsToRender={props.filmsToRender}/>
    </div>
  )
}

export default Main;