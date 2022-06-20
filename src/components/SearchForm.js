import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { useCountryProvider } from "../context/context";
function SearchForm() {
  const {
    filters: { text },
    updateFilters,
  } = useCountryProvider();

  return (
    <Wrapper>
      <div className='contain'>
        <AiOutlineSearch className='icon' />
        <input
          type='text'
          name='text'
          value={text}
          onChange={updateFilters}
          placeholder='Search..'
        />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0;
  width: 100%;
  .contain {
    width: 60%;
    border-radius: 10px;
    background-color: var(--white);
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: var(--shadow-1);
    margin: 0;
  }
  .icon {
    color: var(--grey-900);
    padding: 0;
    width: 30px;
    font-size: 1.4rem;
  }

  input {
    border-radius: 10px;
    border: 0;
    padding: 15px 5px;
    color: var(--gre-300);
    text-transform: capitalize;
    width: 100%;
  }
  @media (max-width: 768px) {
    .contain {
      width: 100%;
    }
  }
  @media (max-width: 500px) {
    .contain {
      width: 150px;
    }
  }
  @media (max-width: 430px) {
    .contain {
      width: 100%;
    }
  }
`;
export default SearchForm;
