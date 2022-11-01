import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import RaceManager from './RaceManager';
import { Race, Student } from '../common/models';

const dummyRaces: Race[] = [
  {lanes: []}
];
const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}
];

it("fails gracefully when provided bad props", () => {
  let container, raceTable;

  // Missing students is not ok if there are races, display error and hide RaceTable
  ({container} = render(<RaceManager races={dummyRaces} onAddRace={jest.fn()} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  expect(raceTable).toBeNull();
  expect(container).toHaveTextContent("Error: Missing students");

  // Missing Add Results callback should display error and hide RaceTable
  render(<RaceManager students={dummyStudents} races={dummyRaces} onAddRace={jest.fn()} />);
  raceTable = within(container).queryByTestId("race-manager-race-table");
  expect(raceTable).toBeNull();
  expect(container).toHaveTextContent("Error: Missing callback");
});

it("handles optional props correctly", () => {
  let container, raceTable, addRaceButton;

  // If races is not present, display a relevant message and hide RaceTable
  ({container} = render(<RaceManager students={dummyStudents} onAddRace={jest.fn()} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  addRaceButton = within(container).queryByTestId("race-manager-add-race-button");
  expect(raceTable).toBeNull();
  expect(addRaceButton).not.toBeVisible();
  expect(container).toHaveTextContent("No races");

  // If Add Race callback is not present, hide the Add Race button and display RaceTable
  ({container} = render(<RaceManager students={dummyStudents} races={dummyRaces} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  addRaceButton = within(container).queryByTestId("race-manager-add-race-button");
  expect(raceTable).toBeVisible();
  expect(addRaceButton).not.toBeVisible();
});

it("integrates with the expected events and child components", () => {
  // Add Race button is hooked to the onAddRace callback
  const mockOnAddRace = jest.fn();
  const {container} = render(<RaceManager students={dummyStudents} races={dummyRaces} onAddResults={mockOnAddRace} />);
  const addRaceButton = within(container).getByTestId("race-manager-add-race-button");
  addRaceButton.click();
  expect(mockOnAddRace).toHaveBeenCalledTimes(1);  
});
