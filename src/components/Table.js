import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Table() {
  const { planets } = useContext(StarWarsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      { planets && planets.map((p) => (
        <tbody key={ p.name }>
          <tr>
            { Object.values(p).map((e) => (<td key={ e }>{e}</td>))}
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default Table;
