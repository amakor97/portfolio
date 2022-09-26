import "./_regularBtn.sass";

function RegularBtn(props) {
  return (
    <button className={`regularBtn ${props.className}`}  onClick={props.action}>{props.text}</button>
  )
}

export default RegularBtn;