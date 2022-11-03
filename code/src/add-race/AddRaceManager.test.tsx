import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Race, Student } from '../common/models';

const dummyRaces: Race[] = [
  {lanes: []}
];
const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}
];

it("integrates with the expected events and child components", () => {
  let container, error;

  // Save Race button is hooked to the onSaveRace callback
  const mockOnSaveRace = jest.fn();
  ({container} = render(<AddRaceManager students={dummyStudents} onSaveRace={mockOnSaveRace} onAddLane={jest.fn()} onCancelAddRace={jest.fn()} />));
  const saveRaceButton = within(container).getByTestId("add-race-manager-save-race-button");
  saveRaceButton.click();
  expect(mockOnSaveRace).toHaveBeenCalledTimes(1);  
  
  // Cancel button is hooked to the onCancelAddRace callback (TODO, similar to the above)
  
  // Add Lane button is hooked to the onAddLane (TODO, similar to the above)
  
  // AddRaceTable is present
  ({container} = render(<AddRaceManager students={dummyStudents} onSaveRace={mockOnSaveRace} onAddLane={jest.fn()} onCancelAddRace={jest.fn()} />));
  const raceTable = within(container).getByTestId("add-race-manager-race-table");
  expect(raceTable).toBeVisible();

  // Error text is present when saveRaceError is provided
  ({container} = render(<AddRaceManager students={dummyStudents} onSaveRace={mockOnSaveRace} onAddLane={jest.fn()} onCancelAddRace={jest.fn()} />));
  error = within(container).getByTestId("add-race-manager-error");
  expect(raceTable).toBeNull();

  ({container} = render(<AddRaceManager students={dummyStudents} onSaveRace={mockOnSaveRace} onAddLane={jest.fn()} onCancelAddRace={jest.fn()} saveRaceError={'foobar'} />));
  error = within(container).getByTestId("add-race-manager-error");
  expect(raceTable).toHaveTextContent('foobar');
});

