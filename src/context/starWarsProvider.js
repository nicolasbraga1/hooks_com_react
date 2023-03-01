import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filter, setFilter] = useState('');
  const [numberFilter, setNumberFilter] = useState('0');
  const [selection, setSelection] = useState('population');
  const [compare, setCompare] = useState('maior que');
  const [usedFilters, setUsedFilters] = useState([]);
  const [column, setColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

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

  const comparePlanets = (array) => {
    switch (compare) {
    case 'maior que':
      setFilteredPlanets(
        array.filter((p) => Number(p[selection]) > Number(numberFilter)),
      );
      if (!usedFilters.includes(selection)) {
        setUsedFilters([...usedFilters, selection]);
      }
      break;
    case 'menor que':
      setFilteredPlanets(
        array.filter((p) => Number(p[selection]) < Number(numberFilter)),
      );
      if (!usedFilters.includes(selection)) {
        setUsedFilters([...usedFilters, selection]);
      }
      break;
    case 'igual a':
      setFilteredPlanets(
        array.filter((p) => Number(p[selection]) === Number(numberFilter)),
      );
      if (!usedFilters.includes(selection)) {
        setUsedFilters([...usedFilters, selection]);
      }
      break;
    default:
      break;
    }
  };

  const btnFunction = () => {
    if (usedFilters.length === 0) {
      comparePlanets(planets);
    } else {
      comparePlanets(filteredPlanets);
    }
    setColumn(column.filter((c) => c !== selection));
  };

  const value = {
    planets,
    filteredPlanets,
    setFilter,
    setNumberFilter,
    setSelection,
    setCompare,
    comparePlanets,
    usedFilters,
    btnFunction,
    compare,
    column,
  };

  return (
    <StarWarsContext.Provider value={ value }>{children}</StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
