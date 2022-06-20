import React, { useState } from "react";
import styled from "styled-components";
import { BsMoon, BsFillMoonFill } from "react-icons/bs";
import { useCountryProvider } from "../context/context";
function Navbar() {
  const { darkmode, darkModeToggle } = useCountryProvider();

  return (
    <Wrapper className={darkmode ? "navbar " : null}>
      <div className='container section-container'>
        <h4 className='title'>Where in the world?</h4>

        <div className='darkmode-container' onClick={darkModeToggle}>
          {darkmode ? (
            <BsFillMoonFill className='icon' />
          ) : (
            <BsMoon className='icon' />
          )}
          <h4>Dark Mode</h4>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: var(--shadow-1);
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 25px 0;
    max-width: var(--max-width);
  }

  .navbar {
    background-color: red;
  }
  .darkmode-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-weight: 700;
  }
  .icon {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    margin-right: 10px;
  }
  h4 {
    padding: 0;
    margin: 0;
  }
  @media (max-width: 768px) {
    h4 {
      font-size: 1.3rem;
    }
  }
`;
export default Navbar;
