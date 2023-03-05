import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';
import PlanetInfo from './PlanetInfo';

function Table() {
  const {
    planets } = useContext(StarWarsContext);

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
      <tbody>
        {planets.map((p) => (
          <PlanetInfo
            key={ p.name }
            name={ p.name }
            rotationPeriod={ p.rotation_period }
            orbitalPeriod={ p.orbital_period }
            diameter={ p.diameter }
            climate={ p.climate }
            gravity={ p.gravity }
            terrain={ p.terrain }
            surfaceWater={ p.surface_water }
            population={ p.population }
            films={ p.films }
            created={ p.created }
            edited={ p.edited }
            url={ p.url }
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
