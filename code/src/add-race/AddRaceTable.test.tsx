import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Lane, Race, Student } from '../common/models';
import { LaneStudent } from './models';
import AddRaceTable from './AddRaceTable';

const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}
];

it("integrates with the expected child components", () => {
  let container, laneAssignmentRows, removeLaneButton;

  const twoLaneAssignments: LaneStudent[] = [
    {laneName: '1', student: dummyStudents[0]}, 
    {laneName: '2', student: dummyStudents[1]}, 
  ];
  const threeLaneAssignments: LaneStudent[] = [
    {laneName: '1', student: dummyStudents[0]}, 
    {laneName: '2', student: dummyStudents[1]}, 
    {laneName: '3', student: dummyStudents[2]}, 
  ];

  // LaneAssignment is present for each laneAssignments entry
  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={twoLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRows = within(container).getAllByTestId("add-race-table-lane-assignments");
  expect(laneAssignmentRows).toHaveLength(2);
  
  // LaneAssignment is present with onRemoveLane from props only if the size of laneAssignments is >= 2 (TODO, RaceManager is a better fit to host this logic)
  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={twoLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRows = within(container).getAllByTestId("add-race-table-lane-assignments");
  for (let row of laneAssignmentRows) {    
    removeLaneButton = within(row).queryByTestId("lane-assignment-remove-lane-button"); // I'm not a fan of this, the AddRaceTable test is now dependant on knowing the implementation details of another component: LaneAssignment
    expect(removeLaneButton).toBeNull();
  }

  ({container} = render(<AddRaceTable students={dummyStudents} laneAssignments={threeLaneAssignments} onEditLaneAssignment={jest.fn()} onRemoveLane={jest.fn()} />));
  laneAssignmentRows = within(container).getAllByTestId("add-race-table-lane-assignments");
  for (let row of laneAssignmentRows) {
    removeLaneButton = within(row).getByTestId("lane-assignment-remove-lane-button"); // I'm not a fan of this, the AddRaceTable test is now dependant on knowing the implementation details of another component: LaneAssignment
    expect(removeLaneButton).toBeVisible();
  }
});
