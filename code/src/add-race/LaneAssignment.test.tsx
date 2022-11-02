import React from 'react';
import { act, getByTestId, render, screen, within } from '@testing-library/react';
import { Race, Student } from '../common/models';
import userEvent from '@testing-library/user-event';

const students: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}, {name: 'Lukas'}
];

/* TODO
it("fails gracefully when provided bad props", () => {
  // Invalid students model should display error in Student column

  // Invalid student model should display error in Student column
});
*/

it("handles optional props correctly", () => {
  // If Remove callback is not present, display row without Remove Lane button
  const {container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" studentName="" onEditLaneAssignment={jest.fn()} /></tr></tbody></table>);
  const button = within(container).queryByTestId("lane-assignment-remove-lane-button");
  expect(button).toBeNull();
});

it("displays the lane details correctly", () => {
  let container;

  // Check Lane is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="OMG LOL" studentName="" onEditLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const lane = within(container).getByTestId("lane-assignment-lane");
  expect(lane).toHaveTextContent("OMG LOL");

  // Check Student is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" studentName={students[0].name} onEditLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const student = within(container).getByTestId("lane-assignment-student");
  expect(student).toHaveTextContent("Shu");

  // Check Actions is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" studentName="" onEditLaneAssignment={jest.fn()} onRemoveLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const actions = within(container).getByTestId("lane-assignment-actions");
  expect(actions).toHaveTextContent("Remove Lane");
});

it("integrates with the expected events", () => {
  let container;

  // Lane and Student changes are hooked to the onEditLaneAssignment callback with the correct parameters
  const mockOnEditLaneAssignment = jest.fn((lane, studentName) => {});
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="cb" studentName={students[0].name} onEditLaneAssignment={mockOnEditLaneAssignment} /></tr></tbody></table>));
  const laneInput = within(container).getByTestId("lane-assignment-lane");
  const studentSelect = within(container).getByTestId("lane-assignment-student");
  userEvent.click(laneInput);
  userEvent.keyboard("a");
  userEvent.selectOptions(studentSelect, "Benji");
  expect(mockOnEditLaneAssignment.mock.calls.length).toBe(2);
  expect(mockOnEditLaneAssignment.mock.calls[0][0]).toBe("cba");
  expect(mockOnEditLaneAssignment.mock.calls[0][1]).toBe("");
  expect(mockOnEditLaneAssignment.mock.calls[1][0]).toBe("cba");
  expect(mockOnEditLaneAssignment.mock.calls[1][1]).toBe("Benji");
  
  // Remove Lane button is hooked to the onRemoveLane callback with the correct parameters
  const mockOnRemoveLaneAssignment = jest.fn((lane) => {});
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={4} laneName="" studentName={students[0]} onEditLaneAssignment={jest.fn()} onRemoveLaneAssignment={mockOnRemoveLaneAssignment} /></tr></tbody></table>));
  const button = within(container).getByTestId("lane-assignment-remove-lane-button");
  button.click();
  expect(mockOnRemoveLaneAssignment.mock.calls.length).toBe(1);
  expect(mockOnRemoveLaneAssignment.mock.calls[0][0]).toBe(4);
});
