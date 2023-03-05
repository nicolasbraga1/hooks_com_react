import { useState } from 'react';

const useSortConfig = (initialState) => {
  const [filter, setFilter] = useState(initialState);
  return {
    filter,
    setFilter,
  };
};

export default useSortConfig;
