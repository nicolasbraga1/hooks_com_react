import React from 'react';

function PlanetInfo(planets) {
  return (
    <tr>
      { Object.values(planets).map((column, index) => (
        <td
          data-testid={ index === 0 ? 'planet-name' : null }
          key={ `column-${index}` }
        >
          {column}
        </td>))}
    </tr>
  );
}

export default PlanetInfo;
