import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

it("integrates with the expected child components", () => {
  let container, stateManager, raceManager, addRaceManager, addResultsManager;

  // stateManager.navPath = 'races' should display only RaceManager
  stateManager = new StateManager(navPath = "races");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).getByTestId("app-race-manager");
  addRaceManager = within(container).getByTestId("app-add-race-manager");
  addResultsManager = within(container).getByTestId("app-add-results-manager");
  expect(raceManager).toBeVisible();
  expect(addRaceManager).not.toBeVisible();
  expect(addResultsManager).not.toBeVisible();
  expect(container).not.toHaveTextContent("Invalid navPath");

  // stateManager.navPath = 'add-race' should display only AddRaceManager
  stateManager = new StateManager(navPath = "add-race");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).getByTestId("app-race-manager");
  addRaceManager = within(container).getByTestId("app-add-race-manager");
  addResultsManager = within(container).getByTestId("app-add-results-manager");
  expect(raceManager).not.toBeVisible();
  expect(addRaceManager).toBeVisible();
  expect(addResultsManager).not.toBeVisible();
  expect(container).not.toHaveTextContent("Invalid navPath");

  // stateManager.navPath = 'add-results' should display only AddResultsManager
  stateManager = new StateManager(navPath = "add-results");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).getByTestId("app-race-manager");
  addRaceManager = within(container).getByTestId("app-add-race-manager");
  addResultsManager = within(container).getByTestId("app-add-results-manager");
  expect(raceManager).not.toBeVisible();
  expect(addRaceManager).not.toBeVisible();
  expect(addResultsManager).toBeVisible();
  expect(container).not.toHaveTextContent("Invalid navPath");

  // stateManager.navPath = 'foobar' should display only error
  stateManager = new StateManager(navPath = "foobar");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).getByTestId("app-race-manager");
  addRaceManager = within(container).getByTestId("app-add-race-manager");
  addResultsManager = within(container).getByTestId("app-add-results-manager");
  expect(raceManager).not.toBeVisible();
  expect(addRaceManager).not.toBeVisible();
  expect(addResultsManager).not.toBeVisible();
  expect(container).toHaveTextContent("Invalid navPath");

  // Should display Header
  stateManager = new StateManager();
  ({container} = render(<App stateManager={stateManager} />));
  const header = within(container).getByTestId("app-header");
  expect(header).toBeVisible();  
});

