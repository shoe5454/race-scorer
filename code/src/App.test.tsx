import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

it("integrates with the expected child components", () => {
  let container, raceManager, addRaceManager, addResultsManager;
  const appModelState = {
    races: [],
    students: []
  };

  // initialNavPath = 'races' should display only RaceManager
  ({container} = render(<App initialNavState={{navPath: 'races'}} initialAppModelState={appModelState} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeVisible();
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'add-race' should display only AddRaceManager
  ({container} = render(<App initialNavState={{navPath: 'add-race'}} initialAppModelState={appModelState} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull();
  expect(addRaceManager).toBeVisible();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'add-results' should display only AddResultsManager
  ({container} = render(<App initialNavState={{navPath: 'add-results'}} initialAppModelState={appModelState} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeVisible();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'foobar' should display only error
  ({container} = render(<App initialNavState={{navPath: 'foobar'}} initialAppModelState={appModelState} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).toHaveTextContent("Error: Invalid navPath");

  // Should display Header
  ({container} = render(<App initialNavState={{navPath: 'races'}} initialAppModelState={appModelState} />));
  const header = within(container).getByTestId("app-header");
  expect(header).toBeVisible();  
});

