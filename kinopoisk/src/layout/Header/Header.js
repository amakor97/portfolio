import "../../Sass/_reset.sass";
import "./_header.sass";

import { useState } from "react";

import AboutWindow from "../../components/AboutWindow/AboutWindow";

function Header() {
  const [aboutIsOpen, setAboutIsOpen] = useState(false);

  const setAboutIsOpenToTrue = () => {
    setAboutIsOpen(true);
  }

  const setAboutIsOpenToFalse = () => {
    setAboutIsOpen(false);
  }

  return(
    <>
      <div className="Header">
        <div className="Header__container">
          <div className="Header__logo-wrapper">logo</div>
          <ul className="Header__list">
            <li className="Header__li">
              <button onClick={setAboutIsOpenToTrue}>
                О приложении
              </button>
            </li>
            <li className="Header__li">
              <nav className="Header__nav">
                <a className="header__nav-link" href="/">На главную</a>
              </nav>
            </li>
          </ul>
        </div>
      </div>

      {aboutIsOpen &&
        <AboutWindow closeAbout={setAboutIsOpenToFalse}/>
      }
    </>
  )
}

export default Header;