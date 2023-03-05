import { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/starWarsContext';
import useSortConfig from '../hooks/useSortConfig';

function FilterByNumbers() {
  const {
    numberFilter,
    setNumberFilter } = useContext(StarWarsContext);
  const column = useSortConfig('population');
  const comparison = useSortConfig('maior que');
  const quantity = useSortConfig(0);
  const filterColumns = [
    'population',
    'diameter',
    'surface_water',
    'orbital_period',
    'rotation_period'];
  const [displayColumns, setDisplayColumns] = useState(filterColumns);

  useEffect(() => {
    numberFilter.forEach((filter) => {
      const renderPlanets = displayColumns.filter((item) => item !== filter.column);
      setDisplayColumns(renderPlanets);
      column.setFilter(renderPlanets[0]);
    });
  }, [numberFilter]);

  const btnFunction = () => {
    setNumberFilter(
      [...numberFilter,
        { value: quantity.filter,
          comparison: comparison.filter,
          column: column.filter,
        }],
    );
  };

  return (
    <div>
      <label>
        Coluna
        <select
          data-testid="column-filter"
          onChange={ (e) => column.setFilter(e.target.value) }
        >
          {displayColumns.map((f) => (
            <option
              key={ f }
              value={ f }
            >
              {f}
            </option>
          ))}
        </select>
      </label>
      <label>
        Operador
        <select
          data-testid="comparison-filter"
          onChange={ (e) => comparison.setFilter(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          value={ quantity.filter }
          onChange={ (e) => quantity.setFilter(e.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ btnFunction }
        >
          Filtrar
        </button>
      </label>
    </div>
  );
}

export default FilterByNumbers;
