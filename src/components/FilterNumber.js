import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function FilterNumber() {
  const {
    setSelection,
    setCompare,
    setNumberFilter,
    btnFunction,
    usedFilters,
    column } = useContext(StarWarsContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChangeCapture={ (e) => setSelection(e.target.value) }
        onClickCapture={ (e) => setSelection(e.target.value) }
      >
        {column.map((filter) => (
          <option
            key={ filter }
            value={ filter }
          >
            {filter}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChangeCapture={ (e) => setCompare(e.target.value) }
        onClickCapture={ (e) => setCompare(e.target.value) }
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
      <div>
        {usedFilters.map(
          (f) => <span key={ f }>{f}</span>,
        )}
      </div>
    </div>
  );
}

export default FilterNumber;
