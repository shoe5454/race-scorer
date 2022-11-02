import React from "react";
import { Student, Race, Lane } from "../common/models";

type ComponentProps = {
  students: Student[];
  laneIndex: number;
  laneName: string;
  student: Student | null;
  onEditLaneAssignment: (laneIndex: number, laneName: string, student: Student | null | undefined) => void;
  onRemoveLaneAssignment?: (laneIndex: number) => void;
}; 

function LaneAssignment(props: ComponentProps) {

  const lane = (
    <td>
      <input data-testid="lane-assignment-lane" type="text" value={props.laneName} onChange={(e) => onLaneNameChange(e, props)}/>
    </td>
  );

  const studentOptions = props.students.map(student => {
    return <option value={student.name} key={student.name}>{student.name}</option>
  });
  const student = (
    <td>
      <select data-testid="lane-assignment-student" value={props.student?.name} onChange={(e) => onStudentChange(e, props)}>
        <option value="" key="none"></option>
        {studentOptions}
      </select>
    </td>
  );

  let removeLaneButton;
  if (props.onRemoveLaneAssignment) {
    removeLaneButton = (
      <td>
        <button data-testid="lane-assignment-remove-lane-button" onClick={() => props.onRemoveLaneAssignment!(props.laneIndex)}>
          Remove Lane
        </button>
      </td>
    );
  } else {
    removeLaneButton = <td></td>;
  }

  return (
    <React.Fragment>
      {lane}
      {student}
      {removeLaneButton}
    </React.Fragment>
  );
}

function onLaneNameChange(e: React.ChangeEvent<HTMLInputElement>, props: ComponentProps) {
  props.onEditLaneAssignment(props.laneIndex, e.target.value, props.student);
}

function onStudentChange(e: React.ChangeEvent<HTMLSelectElement>, props: ComponentProps) {
  const foundStudent = props.students.find(student => student.name == e.target.value);

  props.onEditLaneAssignment(props.laneIndex, props.laneName, foundStudent);
}

export default LaneAssignment;
