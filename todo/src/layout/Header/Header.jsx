import { useState } from "react";

import Logo from "../../components/Logo/Logo";
import AboutWindow from "../../components/AboutWindow/AboutWindow";

import "../../Sass/_reset.sass";
import "../../Sass/_root.sass";
import "./_header.sass";
import "../../Sass/mixins/_link-btn.sass";

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
      <div className="header">
        <div className="header__container">
          <div className="header__logo-wrapper">
            <Logo />
          </div>
          <ul className="header__list">
            <li className="header__li">
              <button className="link-btn header__btn" onClick={setAboutIsOpenToTrue}>
                О приложении
              </button>
            </li>
            <li className="header__li">
              <nav className="header__nav">
                <a className="link-btn header__nav-link" href="/">На главную</a>
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