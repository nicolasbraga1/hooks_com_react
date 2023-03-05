import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function FilterByName() {
  const { filterPlanets } = useContext(StarWarsContext);
  return (
    <div>
      <label>
        Filtrar Planetas:
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (e) => filterPlanets(e.target.value) }
        />
      </label>
    </div>
  );
}

export default FilterByName;
