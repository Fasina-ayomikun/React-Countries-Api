import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCountryProvider } from "../context/context";
import data from "../data.json";
import Country from "./Country";
function Countries() {
  const [endSlice, setEndSlice] = useState(10);
  const [endList, setEndList] = useState(false);

  const {
    isLoading,
    isError,
    filters: { text, region },
    filtered_countries,
    all_products,
  } = useCountryProvider();

  useEffect(() => {
    setEndSlice(10);
    setEndList(false);
  }, [text, region]);
  if (isLoading) {
    return (
      <div className='loading-container'>
        <div className='loading'></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className='section-container error-page'>
        <h2>Sorry, there was an error...</h2>
      </div>
    );
  }
  if (filtered_countries.length < 1) {
    return (
      <div className='error-page allcaps section-container'>
        <h2>Sorry, No country matched your search</h2>
      </div>
    );
  }
  return (
    <Wrapper>
      <div className='section section-container'>
        {filtered_countries.slice(0, endSlice).map((item, index) => {
          return <Country key={index} index={index} {...item} />;
        })}
      </div>
      <button
        type='button'
        onClick={() => {
          setEndSlice((oldSLice) => {
            let newSLice = oldSLice + 10;
            if (oldSLice > filtered_countries.length - 1) {
              setEndList(true);
            }
            return newSLice;
          });
        }}
        className='seemore-btn'
      >
        {endList ? "End of countries" : "see more"}
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 50px;
  }
  .seemore-btn {
    text-transform: uppercase;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 10px;
    width: 200px;
    color: var(--primary-900);
    font-weight: 700;
    opacity: 0.9;
    left: calc(50vw - 100px);
    border-radius: 15px;
    border: 0;
    background-color: var(--grey-700);
    box-shadow: var(--shadow-3);
  }
  @media (max-width: 1085px) {
    .section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 853px) {
    .section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 580px) {
    .section {
      grid-template-columns: 1fr;
    }
  }
`;
export default Countries;
