import React from 'react';
import { act, getByTestId, render, screen, within } from '@testing-library/react';
import { Lane, Race, Student } from '../common/models';
import userEvent from '@testing-library/user-event';
import ResultAssignment from './ResultAssignment';

const students: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}, {name: 'Lukas'}
];

it("fails gracefully when provided bad props", () => {
  // TODO Result value falling outside of numberOfLanes should display error instead of row
});

it("displays the result details correctly", () => {
  let container, lane: Lane;

  lane = {
    name: 'Lane A',
    student: students[0]
  };
  ({container} = render(
    <table><tbody><tr>
      <ResultAssignment numberOfLanes={3} lane={lane} result={2} onEditResultAssignment={jest.fn()} />
    </tr></tbody></table>)
  );

  // Check Lane is displayed correctly
  const laneElem = within(container).getByTestId("result-assignment-lane");
  expect(laneElem).toHaveTextContent("Lane A");

  // Check Student is displayed correctly
  const studentElem = within(container).getByTestId("result-assignment-student");
  expect(studentElem).toHaveTextContent("Shu");

  // Check Result is displayed correctly
  const resultElem = within(container).getByTestId("result-assignment-result");
  expect(resultElem).toHaveTextContent("2");
});

it("integrates with the expected events", () => {
  // Result changes are hooked to the onEditResultAssignment callback with the correct parameters
  const mockOnEditResultAssignment = jest.fn((lane, result) => {});
  const lane = {
    name: 'Lane A',
    student: students[0]
  };
  const {container} = render(
    <table><tbody><tr>
      <ResultAssignment numberOfLanes={2} lane={lane} result={2} onEditResultAssignment={mockOnEditResultAssignment} />
    </tr></tbody></table>
  );
  const result = within(container).getByTestId("result-assignment-result");
  userEvent.selectOptions(result, "2");
  expect(mockOnEditResultAssignment.mock.calls.length).toBe(1);
  expect(mockOnEditResultAssignment.mock.calls[0][0]).toBe(lane);
  expect(mockOnEditResultAssignment.mock.calls[0][1]).toBe(2);  
});
