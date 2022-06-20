import React from "react";
import styled from "styled-components";
import { FaDice, FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";
import { useCountryProvider } from "../context/context";
function Sort() {
  const {
    all_countries,
    updateSort,
    filters: { region },
    updateFilters,
  } = useCountryProvider();

  const regions = [
    "all",
    ...new Set(all_countries.map((country) => country.region)),
  ];

  return (
    <Wrapper>
      <FaDice className='icon' id='shuffle' onClick={updateSort} />
      <FaSortAlphaDown className='icon' id='a-z' onClick={updateSort} />
      <FaSortAlphaUpAlt className='icon' id='z-a' onClick={updateSort} />
      <select name='region' value={region} onChange={updateFilters}>
        {regions.map((region, index) => {
          return (
            <option key={index} value={region}>
              {region}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .icon {
    font-size: 2.5rem;
    background-color: var(--grey-700);
    border-radius: 5px;
    padding: 5px;
    margin: 0 10px;
    color: var(--primary-500);
    &:hover {
      background-color: var(--grey-800);
    }
  }
  select {
    width: 200px;
    padding: 10px 15px;
    border-radius: 5px;
    border: 0;
    box-shadow: var(--shadow-1);
    text-transform: capitalize;
    &:hover {
      padding-left: 20px;
    }
  }
  @media (max-width: 500px) {
    select {
      width: 100px;
    }
  }
  @media (max-width: 430px) {
    justify-content: flex-start;
    margin-top: 20px;
    .icon {
      margin-left: 0;
      margin-right: 15px;
    }
    select {
      width: 150px;
    }
  }
`;
export default Sort;
