import React from "react";
import { Link } from "react-router-dom";
function Error() {
  return (
    <section>
      <div className='section-container error-page'>
        <h1>404</h1>
        <p>Sorry, page not found</p>
        <button type='button'>
          <Link to='/'>Back Home</Link>
        </button>
      </div>
    </section>
  );
}

export default Error;
