import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useCountryProvider } from "../context/context";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

const url = `https://restcountries.com/v2/name/`;
function SingleCountry() {
  const { id } = useParams();

  const {
    darkmode,
    fetchSingleCountry,
    single_loading,
    single_error,
    single_country,
  } = useCountryProvider();
  useEffect(() => {
    fetchSingleCountry(`${url}${id}`);
  }, [id]);

  if (single_loading) {
    return (
      <div className='loading-container section-container'>
        <Loading />
      </div>
    );
  }
  if (single_error) {
    return (
      <div className='error-page'>
        <h2>Sorry, there is an error...</h2>
      </div>
    );
  }

  console.log(single_country);
  let {
    name,
    population,
    region,
    capital,
    subregion,
    flags: { svg: image },
    currencies,
    languages,
    nativeName,
    topLevelDomain: tld,
    borders,
  } = single_country[0];
  if (borders === undefined) {
    borders = ["Nil"];
  }
  console.log(
    name,
    population,
    region,
    capital,
    subregion,
    image,
    currencies,
    languages,
    nativeName,
    tld,
    borders
  );

  return (
    <>
      <Navbar />
      <Wrapper className={`${darkmode ? "dark-mode" : "light-mode"}`}>
        <div className='section-container section'>
          <button type='button' className='back-btn'>
            <Link to='/'>Back</Link>
          </button>
          <div className='section-container info-container'>
            <div className='img-container'>
              <img src={image} alt={name} />
            </div>
            <div className='info-content'>
              <h4>{name}</h4>
              <div className='content'>
                <div>
                  <p>
                    Native Name: <span>{nativeName}</span>{" "}
                  </p>
                  <p>
                    Population: <span>{population}</span>{" "}
                  </p>
                  <p>
                    Region: <span>{region}</span>{" "}
                  </p>
                  <p>
                    Sub Region: <span>{subregion}</span>{" "}
                  </p>
                  <p>
                    Capital: <span>{capital}</span>{" "}
                  </p>
                </div>
                <div>
                  <p>
                    Top Level Domain: <span>{tld}</span>
                  </p>
                  <p>
                    Currencies:{" "}
                    {currencies.map((item, index) => {
                      const { name, symbol } = item;
                      return (
                        <span key={index}>
                          {name} ({symbol} )
                        </span>
                      );
                    })}
                  </p>
                  <p>
                    Languages:{" "}
                    {languages.map((item, index) => {
                      const { nativeName } = item;
                      return <span key={index}>{nativeName}</span>;
                    })}
                  </p>
                </div>
              </div>
              <p className='borders'>
                Border Countries:{" "}
                {borders.map((item, index) => {
                  return (
                    <span className='border' key={index}>
                      {item}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.section`
  .section {
    padding-top: 50px;
  }
  .borders {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .border {
    padding: 5px 10px;
    box-shadow: var(--shadow-1);
  }
  span {
    color: var(--grey-900);
    margin-left: 10px;
    margin-right: 10px;
  }
  h4 {
    font-weight: 700;
    margin-top: 0;
  }
  p {
    color: var(--black);
  }
  .info-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 30px;
  }
  .back-btn {
    padding: 10px 20px;
    box-shadow: var(--shadow-1);
    border: 0;
    border-radius: 5px;
  }
  .back-btn a {
    font-weight: 600;
    letter-spacing: var(--letter-spacing);
  }
  .img-container {
    height: 500px;
    border-radius: 10px;
  }
  img {
    object-fit: cover;
    width: 100%;
    border-radius: 10px;
    height: 100%;
  }
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 865px) {
    .info-container {
      grid-template-columns: 1fr;
      column-gap: 0;
      row-gap: 50px;
    }
    .img-container {
      height: 100%;
    }
  }
  @media (max-width: 375px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
`;
export default SingleCountry;
