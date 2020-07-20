import React from 'react';
import logoPath from '../images/logo1.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="лого" className="logo" />
    </header>
  );
}

export default Header;
