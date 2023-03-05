import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mock from './Mock';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mock),
  }));
});

afterEach(() => {
  jest.resetAllMocks();
});


describe("Testes Star Wars", () => {

  it("Testa se todos os elementos são renderizados", () => {
    render(<App />);

    const nameFilter = screen.getByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();
    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter).toBeInTheDocument();
    const btnFilter = screen.getByTestId("button-filter");
    expect(btnFilter).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("deve filtrar os planetas por nome" , async () => {
    render(<App />);

    const nameFilter = screen.getByTestId("name-filter");
    userEvent.type(nameFilter, "na");
    const planets = await screen.findAllByRole("row");
    expect(planets).toHaveLength(1);
  });

  it("Testa se mostra todos os filtros usados", async () => {
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    userEvent.selectOptions(columnFilter, "surface_water");
    const btnFilter = await screen.findByTestId("button-filter");
    userEvent.click(btnFilter);
    const usedFilter = screen.queryAllByText("surface_water");

    expect(usedFilter[0]).toBeInTheDocument();
  });

  it("Testa se o filtro 'menor que' funciona corretamente", async () => {
    render(<App />);

    const columnFilter = screen.getByTestId("column-filter");
    userEvent.selectOptions(columnFilter, "orbital_period");

    const comparisonFilter = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparisonFilter, "menor que",);

    const valueFilter = await screen.findByTestId("value-filter");
    const btnFilter = await screen.findByTestId("button-filter");
    userEvent.type(valueFilter, "364");
    userEvent.click(btnFilter);

    const filteredPlanets = await screen.findAllByTestId("planet-name");
    expect(filteredPlanets).toHaveLength(3);
  });

  it("Testa se o botão de ordenar funciona corretamente", async () => {
    render(<App />);

    let planets = await screen.findAllByTestId("planet-name");
    const btnAsc = await screen.findByTestId("column-sort-input-asc");
    const btnDesc = await screen.findByTestId("column-sort-input-desc");
    const btnSort = await screen.findByTestId("column-sort-button");
    const columnSort = await screen.findByTestId("column-sort");
    userEvent.selectOptions(columnSort, "population");

    userEvent.click(btnAsc);
    userEvent.click(btnSort);

    planets = await screen.findAllByTestId("planet-name");
    expect(planets[0].innerHTML).toContain("Yavin");

    userEvent.selectOptions(columnSort, "rotation_period");
    userEvent.click(btnDesc);
    userEvent.click(btnSort);
    
    planets = await screen.findAllByTestId("planet-name");
    expect(planets[0].innerHTML).toContain("Kamino");
  });
});