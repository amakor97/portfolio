import "./_aboutWindow.sass";

function AboutWindow(props) {
  return (
    <div className="AboutWindow" onClick={props.closeAbout}>Информация о приложении</div>
  )
}

export default AboutWindow;