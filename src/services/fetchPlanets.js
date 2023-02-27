const fetchPlanets = async () => {
  const planets = await fetch('https://swapi.dev/api/planets');
  const { data } = await planets.json();
  await data.forEach((planet) => delete planet.residents);
  return data;
};

export default fetchPlanets;
