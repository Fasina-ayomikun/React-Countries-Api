import React from "react";
import styled from "styled-components";
import Countries from "../components/Countries";
import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import Sort from "../components/Sort";
import { useCountryProvider } from "../context/context";

function Home() {
  const { darkmode } = useCountryProvider();

  return (
    <>
      <Navbar />
      <Wrapper className={darkmode ? "dark-mode " : "light-mode"}>
        <div className='container section-container'>
          <div className='div '>
            <SearchForm />
            <Sort />
          </div>

          <Countries />
        </div>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.section`
  margin: 0;
  height: 100%;
  .div {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
  }
  padding: 40px 30px;
  @media (max-width: 768px) {
    padding: 40px 0;
  }
  @media (max-width: 430px) {
    .div {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;
export default Home;
