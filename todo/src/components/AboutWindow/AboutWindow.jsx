import "./_aboutWindow.sass";

import "../AppInfo/AppInfo"
import AppInfo from "../AppInfo/AppInfo";

function AboutWindow(props) {
  return (
    <div className="AboutWindow" onClick={props.closeAbout}>
      <AppInfo closeAbout={props.closeAbout}
        onClick={props.closeAbout}
      />
    </div>
  )
}

export default AboutWindow;