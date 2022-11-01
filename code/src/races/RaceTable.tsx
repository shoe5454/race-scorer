import React from "react";
import { Student, Race } from "../common/models";
import RaceDetails from "./RaceDetails";

type ComponentProps = {
  races: Race[];
  students: Student[];
  onAddResults: (race: Race) => void
}; 

function RaceTable(props: ComponentProps) {
  const rows = props.races.map((race, index) =>
    <tr data-testid="race-table-race-details" key={index}>
      <RaceDetails race={race} students={props.students} onAddResults={props.onAddResults} />
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Lanes</th>
          <th>Results (Winner First)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default RaceTable;
