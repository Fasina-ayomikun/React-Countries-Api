import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Country({ name, capital, region, population, flags: { svg: image } }) {
  return (
    <Wrapper>
      <Link to={`/${name}`}>
        <div className='info'>
          <div className='img-container'>
            <img src={image} alt={name} />
          </div>
          <div className='content'>
            <h4>{name}</h4>
            <p>
              Population:
              <span>{population}</span>
            </p>
            <p>
              Region:
              <span>{region}</span>
            </p>
            <p>
              Capital:
              <span>{capital}</span>
            </p>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .info {
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    width: 100%;
    height: 400px;
    background-color: var(--white);
    box-shadow: var(--shadow-1);
    border-radius: 10px;
  }
  .img-container {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .content {
    padding: 0 30px;
    margin: 40px 0;
  }
  h4 {
    font-weight: 600;
    margin: 0;
    margin-bottom: 5px;
  }
  p {
    color: var(--black);
    margin: 0;
  }
  span {
    color: var(--grey-800);
    margin-left: 10px;
  }
@media (max-width:375px){
.info{
height:100%;
}
}

`;
export default Country;
