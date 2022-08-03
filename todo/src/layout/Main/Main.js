import "../../Sass/_reset.sass";
import "../../Sass/_root.sass";
import "./_main.sass";

import TodoContainer from "../../components/TodoContainer/TodoContainer";

function Main() {
  return (
    <div className="Main" id="main-id">
      <h1 className="Main__title">TODO List</h1>
      <TodoContainer />
    </div>
  )
}

export default Main;