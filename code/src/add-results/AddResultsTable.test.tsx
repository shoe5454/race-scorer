import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { Lane, Race, Student } from '../common/models';
import AddResultsTable from './AddResultsTable';
import { LaneResult } from './models';

const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}
];

it("fails gracefully when provided bad props", () => {
  // Empty students should display error instead of table (TODO)

  // resultAssignments that do not match the race it belongs to should display error instead of table (TODO)
});

it("integrates with the expected child components", () => {
  // ResultAssignment is present for each resultAssignment entry with the expected lane, student and result props
  const race: Race = {
    lanes: [
      { name: 'L1', student: dummyStudents[0] },
      { name: 'L2', student: dummyStudents[1] }
    ]
  };
  const resultAssignments: LaneResult[] = [
    {lane: race.lanes[0], result: 2}, 
    {lane: race.lanes[1], result: 1}, 
  ];
  const {container} = render(
    <AddResultsTable race={race} resultAssignments={resultAssignments} onEditResultAssignment={jest.fn()}/>
  );
  const resultAssignmentRows = within(container).getAllByTestId("add-results-table-result-assignments");
  expect(resultAssignmentRows).toHaveLength(2);
  
});
