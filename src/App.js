import React, { useEffect } from "react";

import "./App.css";
import Map from "./components/Map";
import { actions as countryActions } from "./reducers/countries";
import { connect } from "react-redux";

function App(props) {
  const { getCountryData } = props;
  useEffect(() => {
    getCountryData();
  }, []);
  return <Map />;
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCountryData: () => dispatch(countryActions.requestCountriesData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
