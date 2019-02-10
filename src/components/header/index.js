import React from 'react';

const Header = () => {
  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <header>
        <button onClick={event => scrollTop(event)}>Home</button>
    </header>
  );
};

export default Header;
