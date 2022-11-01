import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import RaceManager from './RaceManager';
import { Race, Student } from '../common/models';
import RaceTable from './RaceTable';

const dummyStudents: Student[] = [
  {name: 'Shu'}, {name: 'Jennie'}
];

/*it("fails gracefully when provided bad props", () => {
  // Missing students should display error instead of table
  render(<RaceTable races="" onAddResults="" />);
  expect

  // Missing Add Results callback should display error instead of table
  act(() => {
    render(<RaceTable races="" students="" />, container);
  });
  expect
});*/

it("handles optional props correctly", () => {
  // If races is empty, display table header with 0 RaceDetailsRows
  const {container} = render(<RaceTable races={[]} students={dummyStudents} onAddResults={jest.fn()} />);
  const raceDetailRow = within(container).queryByTestId("race-table-race-detail-row");
  expect(raceDetailRow).toBeNull();
});

it("integrates with the expected child components", () => {
  // RaceDetailsRow is present for each race
  const races: Race[] = [
    {lanes: []}, {lanes: []}, {lanes: []}, {lanes: []}
  ];
    const {container} = render(<RaceTable races={races} students={dummyStudents} onAddResults={jest.fn()} />);
  const raceDetailRow = within(container).queryByTestId("race-table-race-detail-row");
  expect(raceDetailRow).toHaveLength(4);
  
});
