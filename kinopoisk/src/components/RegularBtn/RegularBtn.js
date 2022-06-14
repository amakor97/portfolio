import "./_regularBtn.sass";

function RegularBtn(props) {
  return (
    <button className={`Regular-Btn ${props.className}`}  onClick={props.action}>{props.text}</button>
  )
}

export default RegularBtn;