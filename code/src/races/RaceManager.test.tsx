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
  // Empty students is not ok if there are races, display error and hide RaceTable
  const {container} = render(<RaceManager students={[]} races={dummyRaces} onAddRace={jest.fn()} onAddResults={jest.fn()} />);
  const raceTable = within(container).queryByTestId("race-manager-race-table");
  expect(raceTable).toBeNull();
  expect(container).toHaveTextContent("Error: Missing students");
});

it("handles optional props correctly", () => {
  let container, raceTable, addRaceButton;

  // If races is empty, display a relevant message, and hide RaceTable
  ({container} = render(<RaceManager students={dummyStudents} races={[]} onAddRace={jest.fn()} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  addRaceButton = within(container).queryByTestId("race-manager-add-race-button");
  expect(raceTable).toBeNull();
  expect(addRaceButton).toBeVisible();
  expect(container).toHaveTextContent("No races");

  // If Add Race callback is not present, hide the Add Race button and display RaceTable
  ({container} = render(<RaceManager students={dummyStudents} races={dummyRaces} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  addRaceButton = within(container).queryByTestId("race-manager-add-race-button");
  expect(raceTable).toBeVisible();
  expect(addRaceButton).toBeNull();

  // If Add Race callback is present, show the Add Race button and display RaceTable
  ({container} = render(<RaceManager students={dummyStudents} races={dummyRaces} onAddRace={jest.fn()} onAddResults={jest.fn()} />));
  raceTable = within(container).queryByTestId("race-manager-race-table");
  addRaceButton = within(container).queryByTestId("race-manager-add-race-button");
  expect(raceTable).toBeVisible();
  expect(addRaceButton).toBeVisible();
});

it("integrates with the expected events and child components", () => {
  // Add Race button is hooked to the onAddRace callback
  const mockOnAddRace = jest.fn();
  const {container} = render(<RaceManager students={dummyStudents} races={dummyRaces} onAddRace={mockOnAddRace} onAddResults={jest.fn()} />);
  const addRaceButton = within(container).getByTestId("race-manager-add-race-button");
  addRaceButton.click();
  expect(mockOnAddRace).toHaveBeenCalledTimes(1);  
});
