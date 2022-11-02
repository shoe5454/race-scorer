import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

it("integrates with the expected child components", () => {
  let container, stateManager, raceManager, addRaceManager, addResultsManager;

  // initialNavPath = 'races' should display only RaceManager
  ({container} = render(<App initialNavPath={'races'} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeVisible();
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'add-race' should display only AddRaceManager
  ({container} = render(<App initialNavPath={'add-race'} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull();
  expect(addRaceManager).toBeVisible();
  expect(addResultsManager).toBeNull();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'add-results' should display only AddResultsManager
  ({container} = render(<App initialNavPath={'add-results'} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeVisible();
  expect(container).not.toHaveTextContent("Error: Invalid navPath");

  // initialNavPath = 'foobar' should display only error
  ({container} = render(<App initialNavPath={'foobar'} />));
  raceManager = within(container).queryByTestId("app-race-manager");
  addRaceManager = within(container).queryByTestId("app-add-race-manager");
  addResultsManager = within(container).queryByTestId("app-add-results-manager");
  expect(raceManager).toBeNull;
  expect(addRaceManager).toBeNull();
  expect(addResultsManager).toBeNull();
  expect(container).toHaveTextContent("Error: Invalid navPath");

  // Should display Header
  ({container} = render(<App initialNavPath={'races'} />));
  const header = within(container).getByTestId("app-header");
  expect(header).toBeVisible();  
});

