import React from "react";
import { Student, Race, Lane } from "../common/models";

type ComponentProps = {
  race: Race;
  students: Student[];
  onAddResults: (race: Race) => void
}; 

function RaceDetails(props: ComponentProps) {
  let results;
  let addResultsButton;

  if (props.race.lanes.length > 0 && props.race.lanes[0].result) {
    const lanesCopy: Lane[] = JSON.parse(JSON.stringify(props.race.lanes));
    
    lanesCopy.sort((a, b) => a.result! - b.result! );
    const resultsContent = lanesCopy.map((lane, index) => 
      <span data-testid="race-details-result" key={index}>{index > 0 && ", "} {lane.student.name}</span>
    );
    
    results = <td data-testid="race-details-results">{resultsContent}</td>;
    addResultsButton = <td></td>;
  } else {
    results = <td data-testid="race-details-results">In Progress</td>;
    addResultsButton = <td><button data-testid="race-details-add-results-button" onClick={() => props.onAddResults(props.race)}>Add Results</button></td>;
  }

  const lanesContent = props.race.lanes.map((lane, index) =>
    <div data-testid="race-details-lane" key={index}>{lane.name} - {lane.student.name}</div>  
  );
  const lanes = <td data-testid="race-details-lanes">{lanesContent}</td>;

  return (
    <React.Fragment>
      {lanes}
      {results}
      {addResultsButton}
    </React.Fragment>
  );
}

export default RaceDetails;
