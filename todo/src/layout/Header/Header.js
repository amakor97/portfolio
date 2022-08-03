import "../../Sass/_reset.sass";
import "../../Sass/_root.sass";
import "./_header.sass";
import "../../Sass/mixins/_link-btn.sass";
import Logo from "../../components/Logo/Logo";

import { useState } from "react";


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
          <div className="Header__logo-wrapper">
            <Logo />
          </div>
          <ul className="Header__list">
            <li className="Header__li">
              <button className="link-btn Header__btn" onClick={setAboutIsOpenToTrue}>
                О приложении
              </button>
            </li>
            <li className="Header__li">
              <nav className="Header__nav">
                <a className="link-btn Header__nav-link" href="/">На главную</a>
              </nav>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header;