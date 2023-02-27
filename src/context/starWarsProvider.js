import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const planetsAPI = async () => {
    const fetchResults = await fetchPlanets();
    setPlanets(fetchResults);
  };

  useEffect(() => {
    planetsAPI();
  }, []);

  const value = {
    planets,
  };

  return (
    <StarWarsContext.Provider value={ value }>{children}</StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
