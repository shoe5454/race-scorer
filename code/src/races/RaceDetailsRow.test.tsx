import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Race, Student } from '../common/models';
import { idText } from 'typescript';

const students: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}, {name: 'Lukas'}
];

/* TODO
it("fails gracefully when provided bad props", () => {
  // Invalid students model should display error in Lane and finished Results column

  // Invalid race model should display error
});
*/

it("displays the race details correctly", () => {
  let container, results, addResultsButton;

  const raceWithNoResults: Race = {
    lanes: [
      {name: 'Lane1', student: students[3]}, 
      {name: 'Lane2', student: students[2]}, 
      {name: 'Lane3', student: students[1]}, 
      {name: 'Lane4', student: students[0]}, 
    ]
  };
  const raceWithResults: Race = {
    lanes: [
      {name: 'Lane1', student: students[3], result: 3}, 
      {name: 'Lane2', student: students[2], result: 1}, 
      {name: 'Lane3', student: students[1], result: 4}, 
      {name: 'Lane4', student: students[0], result: 2}, 
    ]
  };

  // A race without any results should display as In Progress with a Record Results button
  ({container} = render(<RaceDetailsRow students={students} race={raceWithNoResults} onAddResults={jest.fn()} />));
  results = within(container).getByTestId("race-details-row-results");
  addResultsButton = within(container).getByTestId("race-details-row-add-results-button");
  expect(results).toHaveTextContent("In Progress");
  expect(addResultsButton).toBeVisible();

  // A race with results should not display as In Progress, and hide the Record Results button
  ({container} = render(<RaceDetailsRow students={students} race={raceWithResults} onAddResults={jest.fn()} />));
  results = within(container).getByTestId("race-details-row-results");
  addResultsButton = within(container).getByTestId("race-details-row-add-results-button");
  expect(results).not.toHaveTextContent("In Progress");
  expect(addResultsButton).not.toBeVisible();
  
  /*// Check Race ID is displayed correctly
  ({container} = render(<RaceDetailsRow students={students} race={raceWithNoResults} onAddResults={jest.fn()} />));
  const ids = within(container).getAllByTestId("race-details-row-id");
  for (let i = 0; i < ids.length; i++) {
    expect(ids[i]).toHaveTextContent((i+1).toString());
  }*/

  // Check Lanes is displayed correctly
  ({container} = render(<RaceDetailsRow students={students} race={raceWithNoResults} onAddResults={jest.fn()} />));
  const lanes = within(container).getAllByTestId("race-details-row-lane");
  expect(lanes.length).toBe(4);
  expect(lanes[0]).toHaveTextContent("Lane1 - Lukas");
  expect(lanes[1]).toHaveTextContent("Lane2 - Benji");
  expect(lanes[2]).toHaveTextContent("Lane3 - Jennie");
  expect(lanes[3]).toHaveTextContent("Lane4 - Shu");

  // Check Results is displayed correctly
  ({container} = render(<RaceDetailsRow students={students} race={raceWithResults} onAddResults={jest.fn()} />));
  results = within(container).getAllByTestId("race-details-row-result");
  expect(results.length).toBe(4);
  expect(results[0]).toHaveTextContent("Benji");
  expect(results[1]).toHaveTextContent("Shu");
  expect(results[2]).toHaveTextContent("Lukas");
  expect(results[3]).toHaveTextContent("Jennie");
});

it("integrates with the expected events", () => {
  const raceWithResults: Race = {
    lanes: [
      {name: 'Lane1', student: students[3], result: 3}, 
      {name: 'Lane2', student: students[2], result: 1}, 
      {name: 'Lane3', student: students[1], result: 4}, 
      {name: 'Lane4', student: students[0], result: 2}, 
    ]
  };

  // Add Results button is hooked to the onAddResults callback
  const mockOnAddResults = jest.fn();
  const {container} = render(<RaceDetailsRow students={students} races={raceWithResults} onAddResults={mockOnAddResults} />);
  const addResultsButton = within(container).getByTestId("race-details-row-add-results-button");
  addResultsButton.click();
  expect(mockOnAddResults).toHaveBeenCalledTimes(1);
});
