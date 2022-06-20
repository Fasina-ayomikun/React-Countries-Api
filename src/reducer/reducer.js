import React from "react";

function reducer(state, action) {
  if (action.type === "COUNTRIES_LOADING") {
    return { ...state, isLoading: true };
  }
  if (action.type === "COUNTRIES_ERROR") {
    return { ...state, isLoading: false, isError: true };
  }
  if (action.type === "COUNTRIES_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      isError: false,
      all_countries: action.payload,
      filtered_countries: [...action.payload],
    };
  }
  if (action.type === "UPDATE_FILTERS") {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === "FILTER_COUNTRIES") {
    const { text, region } = state.filters;
    const { all_countries } = state;
    let tempCountries = [...all_countries];

    if (text) {
      tempCountries = tempCountries.filter((country) =>
        country.name.toLowerCase().startsWith(text)
      );
    }
    if (region !== "all") {
      tempCountries = tempCountries.filter(
        (country) => country.region === region
      );
    }

    return {
      ...state,
      filtered_countries: tempCountries,
    };
  }
  if (action.type === "UPDATE_SORT") {
    return { ...state, sort: action.payload };
  }
  if (action.type === "SORT_COUNTRIES") {
    const { filtered_countries, sort } = state;
    let tempCountries = [...filtered_countries];

    if (sort === "a-z") {
      tempCountries = tempCountries.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "z-a") {
      tempCountries = tempCountries.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    if (sort === "shuffle") {
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          console.log(j);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };

      tempCountries = shuffleArray(filtered_countries);
      console.log(tempCountries);
    }

    return { ...state, filtered_countries: tempCountries };
  }
  if (action.type === "SINGLE_COUNTRY_LOADING") {
    return { ...state, single_loading: true, single_error: false };
  }
  if (action.type === "SINGLE_COUNTRY_ERROR") {
    return { ...state, single_loading: false, single_error: true };
  }
  if (action.type === "SINGLE_COUNTRY_SUCCESS") {
    console.log(action.payload);
    return {
      ...state,
      single_loading: false,
      single_error: false,
      single_country: action.payload,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
}

export default reducer;
