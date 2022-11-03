import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Lane, Race, Student } from '../common/models';
import AddRaceTable from './AddRaceTable';

const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}
];

it("integrates with the expected child components", () => {
  let container, laneAssignmentRow, removeLaneButton;

  const twoLaneAssignments: Lane[] = [
    {name: '1', student: dummyStudents[0]}, 
    {name: '2', student: dummyStudents[1]}, 
  ];
  const threeLaneAssignments: Lane[] = [
    {name: '1', student: dummyStudents[0]}, 
    {name: '2', student: dummyStudents[1]}, 
    {name: '3', student: dummyStudents[2]}, 
  ];

  // LaneAssignment is present for each laneAssignments entry
  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={twoLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRow = within(container).getAllByTestId("add-race-table-lane-assignments");
  expect(laneAssignmentRow).toHaveLength(2);
  
  // LaneAssignment is present with onRemoveLane from props only if the size of laneAssignments is >= 2
  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={twoLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRow = within(container).getByTestId("add-race-table-lane-assignments");
  removeLaneButton = within(laneAssignmentRow).getAllByTestId("lane-assignment-remove-lane-button"); // I'm not a fan of this, the AddRaceTable test is now dependant on knowing the implementation details of another component: LaneAssignment
  expect(removeLaneButton).toBeNull();

  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={threeLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRow = within(container).getByTestId("add-race-table-lane-assignments");
  removeLaneButton = within(laneAssignmentRow).getAllByTestId("lane-assignment-remove-lane-button"); // I'm not a fan of this, the AddRaceTable test is now dependant on knowing the implementation details of another component: LaneAssignment
  expect(removeLaneButton).not.toBeNull();
});
