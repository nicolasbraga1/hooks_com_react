import React from 'react';
import './App.css';
import StarWarsProvider from './context/starWarsProvider';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';

function App() {
  return (
    <StarWarsProvider>
      <FilterName />
      <FilterNumber />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
