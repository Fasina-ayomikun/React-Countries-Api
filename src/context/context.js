import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../reducer/reducer";

const CountryContext = createContext();

const url = "https://restcountries.com/v2/all";
const initialState = {
  all_countries: [],
  filtered_countries: [],
  isLoading: true,
  isError: false,
  single_country: [],
  single_loading: true,
  single_error: false,
  sort: "a-z",
  filters: {
    text: "",
    region: "all",
  },
};
const getLocalStorage = () => {
  let theme = true;
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};
const CountryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkmode, setDarkmode] = useState(getLocalStorage());

  const darkModeToggle = () => {
    setDarkmode(!darkmode);
    localStorage.setItem("theme", darkmode);
  };

  const fetchCountries = async () => {
    dispatch({ type: "COUNTRIES_LOADING" });
    try {
      const response = await axios.get(url);
      const { data } = response;

      dispatch({ type: "COUNTRIES_SUCCESS", payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: "COUNTRIES_ERROR" });
    }
  };
  const updateSort = (e) => {
    const id = e.target.id;

    dispatch({ type: "UPDATE_SORT", payload: id });
  };
  const updateFilters = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ type: "UPDATE_FILTERS", payload: { value, name } });
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchSingleCountry = async (url) => {
    dispatch({ type: "SINGLE_COUNTRY_LOADING" });
    try {
      const response = await axios.get(url);
      console.log(response.data);
      dispatch({ type: "SINGLE_COUNTRY_SUCCESS", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SINGLE_COUNTRY_ERROR" });
    }
  };
  useEffect(() => {
    dispatch({ type: "FILTER_COUNTRIES" });
    dispatch({ type: "SORT_COUNTRIES" });
  }, [state.filters, state.sort, state.all_countries]);
  return (
    <CountryContext.Provider
      value={{
        ...state,
        updateFilters,
        fetchSingleCountry,
        updateSort,
        darkmode,
        darkModeToggle,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
export const useCountryProvider = () => {
  return useContext(CountryContext);
};

export default CountryProvider;
