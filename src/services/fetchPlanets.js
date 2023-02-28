const fetchPlanets = async () => {
  const planets = await fetch('https://swapi.dev/api/planets');
  const { results } = await planets.json();
  await results.forEach((planet) => delete planet.residents);
  return results;
};

export default fetchPlanets;
