import React from 'react';
import './App.css';
import StarWarsProvider from './context/starWarsProvider';
import Table from './components/Table';
import FilterNumber from './components/Filter';

function App() {
  return (
    <StarWarsProvider>
      <FilterNumber />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
