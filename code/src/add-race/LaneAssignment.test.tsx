import React from 'react';
import { act, getByTestId, render, screen, within } from '@testing-library/react';
import { Race, Student } from '../common/models';
import userEvent from '@testing-library/user-event';
import LaneAssignment from './LaneAssignment';

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
  const {container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" student={null} onEditLaneAssignment={jest.fn()} /></tr></tbody></table>);
  const button = within(container).queryByTestId("lane-assignment-remove-lane-button");
  expect(button).toBeNull();
});

it("displays the lane details correctly", () => {
  let container;

  // Check Lane is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="OMG LOL" student={null} onEditLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const lane = within(container).getByTestId("lane-assignment-lane");
  expect(lane).toHaveValue("OMG LOL");

    // TODO Check empty lane name

  // Check Student is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" student={students[0]} onEditLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const student = within(container).getByTestId("lane-assignment-student");
  expect(student).toHaveTextContent("Shu");

  // TODO Check null Student

  // Check Remove Lane button is displayed correctly
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={0} laneName="" student={null} onEditLaneAssignment={jest.fn()} onRemoveLaneAssignment={jest.fn()} /></tr></tbody></table>));
  const actions = within(container).getByTestId("lane-assignment-remove-lane-button");
  expect(actions).toHaveTextContent("Remove Lane");
});

it("integrates with the expected events", () => {
  let container;

  // Lane and Student changes are hooked to the onEditLaneAssignment callback with the correct parameters
  const mockOnEditLaneAssignment = jest.fn((laneIndex, laneName, student) => {});
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={3} laneName="cb" student={null} onEditLaneAssignment={mockOnEditLaneAssignment} /></tr></tbody></table>));
  const laneInput = within(container).getByTestId("lane-assignment-lane");
  const studentSelect = within(container).getByTestId("lane-assignment-student");
  userEvent.click(laneInput);
  userEvent.keyboard("a");
  userEvent.selectOptions(studentSelect, "Benji");
  expect(mockOnEditLaneAssignment.mock.calls.length).toBe(2);
  expect(mockOnEditLaneAssignment.mock.calls[0][0]).toBe(3);
  expect(mockOnEditLaneAssignment.mock.calls[0][1]).toBe("cba");
  expect(mockOnEditLaneAssignment.mock.calls[0][2]).toBeNull();
  expect(mockOnEditLaneAssignment.mock.calls[1][0]).toBe(3);
  expect(mockOnEditLaneAssignment.mock.calls[1][1]).toBe("cb");
  expect(mockOnEditLaneAssignment.mock.calls[1][2].name).toBe("Benji");
  
  // Remove Lane button is hooked to the onRemoveLane callback with the correct parameters
  const mockOnRemoveLaneAssignment = jest.fn((laneIndex) => {});
  ({container} = render(<table><tbody><tr><LaneAssignment students={students} laneIndex={4} laneName="" student={students[0]} onEditLaneAssignment={jest.fn()} onRemoveLaneAssignment={mockOnRemoveLaneAssignment} /></tr></tbody></table>));
  const button = within(container).getByTestId("lane-assignment-remove-lane-button");
  button.click();
  expect(mockOnRemoveLaneAssignment.mock.calls.length).toBe(1);
  expect(mockOnRemoveLaneAssignment.mock.calls[0][0]).toBe(4);
});
