import { useContext } from "react";

import "./_filmInfo.sass";



function FilmInfo(props) {
  //const props = useContext(FilmContext);
  console.log(props);

  return (
    <div className="FilmInfo">{props.nameRu}</div>
  )
}

export default FilmInfo;