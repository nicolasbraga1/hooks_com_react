import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/fetchPlanets';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [numberFilter, setNumberFilter] = useState([]);
  const [sorted, setSorted] = useState({ column: 'population', sort: 'ASC' });

  const planetsAPI = async () => {
    const fetchResults = await fetchPlanets();
    setPlanets(fetchResults);
  };

  const filterPlanets = (planetName) => {
    const search = planets.filter((p) => p.name.toLowerCase().includes(planetName));
    setFilteredPlanets(search);
  };

  const comparePlanets = (column, comparison, value, index) => {
    let array = [];
    if (index === 0) {
      array = planets;
    } else {
      array = filteredPlanets;
    }
    const planetsFiltered = array.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return Number(planet[column]) > Number(value);
      case 'menor que':
        return Number(planet[column]) < Number(value);
      case 'igual a':
        return Number(planet[column]) === Number(value);
      default:
        return null;
      }
    });
    setFilteredPlanets(planetsFiltered);
  };

  useEffect(() => {
    planetsAPI();
    if (numberFilter.length === 0) {
      setFilteredPlanets('');
    } else {
      numberFilter.forEach(
        (e, index) => comparePlanets(
          e.column,
          e.comparison,
          e.value,
          index,
        ),
      );
    }
  }, [numberFilter]);

  const sortConfig = (array, colum, sort) => {
    const planetsSorted = [];
    if (sort === 'DESC') {
      planetsSorted.push([...array.sort((x, y) => {
        const firstPlanet = x[colum] === 'unknow' ? Infinity : Number(x[colum]);
        const secondPlanet = y[colum] === 'unknow' ? Infinity : Number(y[colum]);
        return secondPlanet - firstPlanet;
      })]);
    } else {
      planetsSorted.push([...array.sort((x, y) => {
        const firstPlanet = x[colum] === 'unknow' ? Infinity : Number(x[colum]);
        const secondPlanet = y[colum] === 'unknow' ? Infinity : Number(y[colum]);
        return firstPlanet - secondPlanet;
      })]);
    }
    return [...planetsSorted[0]];
  };

  const sortFunction = () => {
    let sortingPlanets = [];
    if (numberFilter.length === 0) {
      sortingPlanets = sortConfig(planets, sorted.column, sorted.sort);
    } else {
      sortingPlanets = sortConfig(filteredPlanets, sorted.column, sorted.sort);
    }
    setFilteredPlanets(sortingPlanets);
  };

  const value = (
    {
      planets: filteredPlanets || planets,
      filterPlanets,
      numberFilter,
      setNumberFilter,
      sorted,
      setSorted,
      sortFunction,
    }
  );

  return (
    <StarWarsContext.Provider value={ value }>{children}</StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
