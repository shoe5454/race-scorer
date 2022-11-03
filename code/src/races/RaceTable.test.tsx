import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import RaceManager from './RaceManager';
import { Race, Student } from '../common/models';
import RaceTable from './RaceTable';

const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}
];

it("fails gracefully when provided bad props", () => {
  // If races is empty, display table header with 0 RaceDetails
  const {container} = render(<RaceTable races={[]} students={dummyStudents} onAddResults={jest.fn()} />);
  const raceDetailRow = within(container).queryByTestId("race-table-race-details");
  expect(raceDetailRow).toBeNull();
});

it("integrates with the expected child components", () => {
  // RaceDetails is present for each race
  const races: Race[] = [
    {lanes: []}, {lanes: []}, {lanes: []}, {lanes: []}
  ];
  const {container} = render(<RaceTable races={races} students={dummyStudents} onAddResults={jest.fn()} />);
  const raceDetailRow = within(container).getAllByTestId("race-table-race-details");
  expect(raceDetailRow).toHaveLength(4);
 
});
