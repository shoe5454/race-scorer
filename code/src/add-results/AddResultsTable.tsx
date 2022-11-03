import React from "react";
import { Student, Race, Lane } from "../common/models";
import { LaneResult } from "./models";
import ResultAssignment from "./ResultAssignment";

type ComponentProps = {
  race: Race;
  resultAssignments: LaneResult[];
  onEditResultAssignment: (lane: Lane, result: number | null | undefined) => void;
}; 

function AddResultsTable(props: ComponentProps) {
  const rows = props.resultAssignments.map((laneResult, index) =>
    <tr data-testid="add-results-table-result-assignments" key={index}>
      <ResultAssignment 
        numberOfLanes={props.race.lanes.length} 
        lane={props.race.lanes[index]} 
        result={laneResult.result}
        onEditResultAssignment={props.onEditResultAssignment} />
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Lane</th>
          <th>Student</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default AddResultsTable;
