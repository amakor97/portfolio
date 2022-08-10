import "./_searchFilter.sass";

function SearchFilter(props) {

  function handleInput(e) {
    props.setSearchRegEx(e.target.value);
  }

  function resetInput(e) {
    props.setSearchRegEx(".*");
    e.target.parentNode["searchReg"].value = "";
  }

  return (
    <div className="searchFilter">
      <form>
        <input className="searchFilter__input" name="searchReg"
        onChange={(e) => handleInput(e)}></input>
        <button type="button" className="searchFilter__reset-btn" onClick={(e) => {resetInput(e)}}>Очис</button>
      </form>
    </div>
  )
}

export default SearchFilter;