import "./_searchFilter.sass";

function SearchFilter(props) {

  function handleInput(e) {
    console.log(e.target.value);
    props.setSearchRegEx(e.target.value);
  }

  return (
    <input className="searchFilter" 
    onChange={(e) => handleInput(e)}></input>
  )
}

export default SearchFilter;