import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function FilterNumber() {
  const {
    setSelection,
    setCompare,
    setNumberFilter,
    btnFunction,
    usedFilters } = useContext(StarWarsContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (e) => setSelection(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setCompare(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          onChange={ (e) => setNumberFilter(e.target.value) }
          defaultValue="0"
        />
        <button
          data-testid="button-filter"
          onClick={ () => btnFunction() }
        >
          Filtrar
        </button>
      </label>
      <div>{usedFilters.map((f) => <span key={ f }>{f}</span>)}</div>
    </div>
  );
}

export default FilterNumber;
