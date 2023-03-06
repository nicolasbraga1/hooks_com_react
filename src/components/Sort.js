import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Sort() {
  const {
    sorted,
    setSorted,
    sortFunction } = useContext(StarWarsContext);
  const filterColumns = [
    'population',
    'diameter',
    'surface_water',
    'orbital_period',
    'rotation_period'];

  const sortBtn = ({ target: { name, value } }) => {
    switch (name) {
    case 'column':
      setSorted({ column: value, sort: sorted.sort });
      break;
    case 'sort':
      setSorted({ column: sorted.column, sort: value });
      break;
    default:
      return null;
    }
  };

  return (
    <div>
      <select
        name="column"
        id="column"
        data-testid="column-sort"
        onChange={ sortBtn }
        value={ sorted.column }
      >
        { filterColumns.map((c) => (
          <option key={ c } value={ c }>
            { c }
          </option>
        )) }
      </select>

      <label>
        Ascendente
        <input
          data-testid="column-sort-input-asc"
          name="sort"
          value="ASC"
          type="radio"
          onChange={ sortBtn }
          checked={ sorted.sort === 'ASC' }
        />
      </label>
      <label>
        Descendente
        <input
          data-testid="column-sort-input-desc"
          name="sort"
          value="DESC"
          type="radio"
          onChange={ sortBtn }
          checked={ sorted.sort === 'DESC' }
        />
      </label>

      <button
        data-testid="column-sort-button"
        onClick={ sortFunction }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Sort;
