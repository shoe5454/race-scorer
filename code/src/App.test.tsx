import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import AppStateManager from './AppStateManager';

it("integrates with the expected child components", () => {
  let container, stateManager, raceManager, addRaceManager, addResultsManager;

  // stateManager.navPath = 'races' should display only RaceManager
  stateManager = new AppStateManager("races");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeVisible();
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // stateManager.navPath = 'add-race' should display only AddRaceManager
  stateManager = new AppStateManager("add-race");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull();
  expect(addRaceManager).toBeVisible();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // stateManager.navPath = 'add-results' should display only AddResultsManager
  stateManager = new AppStateManager("add-results");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeVisible();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // stateManager.navPath = 'foobar' should display only error
  stateManager = new AppStateManager("foobar");
  ({container} = render(<App stateManager={stateManager} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).toHaveTextContent("Error: Invalid navPath");

  // Should display Header
  stateManager = new AppStateManager();
  ({container} = render(<App stateManager={stateManager} />));
  const header = within(container).getByTestId("app-header");
  expect(header).toBeVisible();  
});

