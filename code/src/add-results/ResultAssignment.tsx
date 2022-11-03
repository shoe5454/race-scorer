import React from "react";
import { Student, Race, Lane } from "../common/models";

type ComponentProps = {
  laneIndex: number;
  numberOfLanes: number;
  lane: Lane;
  result: number | null;
  onEditResultAssignment: (laneIndex: number, result: number | null | undefined) => void;
}; 

function ResultAssignment(props: ComponentProps) {
  const resultOptions = [];
  for (let i = 1; i <= props.numberOfLanes; i++) {
    resultOptions.push(<option value={i} key={i}>{i}</option>);
  };
  const result = (
    <td>
      <select data-testid="result-assignment-result" value={props.result === null ? "" : props.result} onChange={(e) => onResultChange(e, props)}>
        <option value="" key="none"></option>
        {resultOptions}
      </select>
    </td>
  );

  return (
    <React.Fragment>
      <td data-testid="result-assignment-lane">{props.lane.name}</td>
      <td data-testid="result-assignment-student">{props.lane.student.name}</td>
      {result}
    </React.Fragment>
  );
}

function onResultChange(e: React.ChangeEvent<HTMLSelectElement>, props: ComponentProps) {
  props.onEditResultAssignment(props.laneIndex, parseInt(e.target.value));
}

export default ResultAssignment;
