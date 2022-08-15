import { memo } from "react";

import "./_searchFilter.sass";

function SearchFilter(props) {

  function handleInput(e) {
    props.stateHandler("setSearchRegEx", e.target.value);
  }

  function resetInput(e) {
    props.stateHandler("setSearchRegEx", ".*");
    e.target.parentNode["searchReg"].value = "";
  }

  return (
    <div className="searchFilter">
      <form 
        className="searchFilter__form" 
        onSubmit={e => {e.preventDefault()}}>
        <input 
          className="searchFilter__input" 
          name="searchReg"
          placeholder="Название задачи"
          onChange={e => handleInput(e)}></input>
        <button 
          type="button" 
          className="searchFilter__reset-btn" 
          onClick={e => resetInput(e)}>
          <svg className="searchFilter__reset-btn-svg" 
            viewBox="0 0 449.998 449.998">
            <polygon points="449.974,34.855 415.191,0 225.007,190.184 34.839,0 0.024,34.839 190.192,224.999 0.024,415.159 34.839,449.998 225.007,259.797 415.191,449.998 449.974,415.143 259.83,224.999 "/>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default memo(SearchFilter);