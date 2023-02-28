import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filter, setFilter] = useState('');

  const planetsAPI = async () => {
    const fetchResults = await fetchPlanets();
    setPlanets(fetchResults);
  };

  useEffect(() => {
    planetsAPI();
  }, []);

  useEffect(() => {
    const search = filter.length > 0
      ? planets.filter((p) => p.name.toLowerCase().includes(filter))
      : [];
    setFilteredPlanets(search);
  }, [filter, planets]);

  const value = {
    planets,
    filteredPlanets,
    filter,
    setFilter,
  };

  return (
    <StarWarsContext.Provider value={ value }>{children}</StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
