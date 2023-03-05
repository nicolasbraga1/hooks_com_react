import { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';
import FilterByName from './FilterByName';
import FilterByNumbers from './FilterByNumbers';
import Sort from './Sort';

function Filter() {
  const {
    numberFilter } = useContext(StarWarsContext);

  return (
    <div>
      <FilterByName />
      <FilterByNumbers />
      <Sort />
      <div>
        {numberFilter.map((f) => (
          <span data-testid="filter" key={ f.column }>
            {`${f.column} ${f.comparison} ${f.value}`}
          </span>))}
      </div>
    </div>
  );
}

export default Filter;
