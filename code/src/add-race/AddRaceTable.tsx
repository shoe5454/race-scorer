import React from "react";
import { Student, Race, Lane } from "../common/models";
import LaneAssignment from "./LaneAssignment";

type LaneStudent = {
  laneName: string;
  student: Student | null;
};

type ComponentProps = {
  students: Student[];
  laneAssignments: LaneStudent[];
  onEditLaneAssignment: (laneIndex: number, laneName: string, student: Student | null | undefined) => void;
  onRemoveLane: (laneIndex: number) => void
}; 

function AddRaceTable(props: ComponentProps) {
  const rows = props.laneAssignments.map((laneStudent, index) =>
    <tr data-testid="add-race-table-lane-assignments" key={index}>
      <LaneAssignment 
        students={props.students} 
        laneIndex={index} 
        laneName={laneStudent.laneName} 
        student={laneStudent.student} 
        onEditLaneAssignment={props.onEditLaneAssignment}
        onRemoveLaneAssignment={props.laneAssignments.length > 2 ? props.onRemoveLane : undefined} />
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Lane</th>
          <th>Student</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default AddRaceTable;
