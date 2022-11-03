import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Race, Student } from '../common/models';
import AddResultsManager from './AddResultsManager';

const dummyRaces: Race[] = [
  {lanes: []}
];
const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}
];

it("fails gracefully when provided bad props", () => {
  // Empty students should display error and hide AddResultsTable (TODO)
});

it("integrates with the expected events and child components", () => {
  let container, error;

  // Save Results button is hooked to the onSaveResults callback
  const mockOnSaveResults = jest.fn();
  const race: Race = {
    lanes: [
      { name: 'L1', student: dummyStudents[0] },
      { name: 'L2', student: dummyStudents[1] }
    ]
  };
  ({container} = render(<AddResultsManager race={race} onSaveResults={mockOnSaveResults} onCancelAddResults={jest.fn()} />));
  const saveResultsButton = within(container).getByTestId("add-results-manager-save-results-button");
  saveResultsButton.click();
  expect(mockOnSaveResults).toHaveBeenCalledTimes(1);  
  
  // Cancel button is hooked to the onCancelAddResults callback
  const mockOnCancelAddResults = jest.fn();
  ({container} = render(<AddResultsManager race={race} onSaveResults={jest.fn()} onCancelAddResults={mockOnCancelAddResults} />));
  const cancelButton = within(container).getByTestId("add-results-manager-cancel-add-results-button");
  cancelButton.click();
  expect(mockOnCancelAddResults).toHaveBeenCalledTimes(1);  

  // Error text is present when saveResultsError is provided
  ({container} = render(<AddResultsManager race={race} onSaveResults={jest.fn()} onCancelAddResults={mockOnCancelAddResults} />));
  error = within(container).getByTestId("add-results-manager-error");
  expect(error).toBeEmptyDOMElement();

  ({container} = render(<AddResultsManager race={race} onSaveResults={jest.fn()} onCancelAddResults={mockOnCancelAddResults} saveResultsError="foobar" />));
  error = within(container).getByTestId("add-results-manager-error");
  expect(error).toHaveTextContent('foobar');
  
  // AddResultsTable is present with the students and race from props and laneResultMap from state (TODO because already demonstrated in AddRaceManager)
  
});