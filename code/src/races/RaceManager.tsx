import { Student, Race } from "../common/models";
import RaceTable from "./RaceTable";

type ComponentProps = {
  students: Student[];
  races: Race[];
  onAddRace?: () => void;
  onAddResults: (race: Race) => void;
}; 

function RaceManager(props: ComponentProps) {
  if (props.races.length > 0 && props.students.length == 0) {
    return (
      <div>Error: Missing students</div>
    );
  }

  let message = <></>;
  let raceTable = <></>;
  let addRaceButton = <></>;
  if (props.races.length == 0) {
    message = <div className="App-alert">Got a race to manage? Hit that button below.</div>;
  } else {
    raceTable = <div data-testid="race-manager-race-table"><RaceTable races={props.races} students={props.students} onAddResults={props.onAddResults} /></div>;
  }
  if (props.onAddRace) {
    addRaceButton = <button className="App-bar-button" data-testid="race-manager-add-race-button" onClick={props.onAddRace}>Add Race</button>;
  }

  return (
    <div>
      {message}
      {raceTable}
      {addRaceButton}
    </div>
  );
}

export default RaceManager;
