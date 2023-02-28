import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function FilterName() {
  const { setFilter } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="planet-filter">
        Filtrar Planetas:
        <input
          name="planet-filter"
          type="text"
          data-testid="name-filter"
          onChange={ (e) => setFilter(e.target.value) }
        />
      </label>
    </div>
  );
}

export default FilterName;
