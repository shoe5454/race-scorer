import React, { useReducer } from "react";
import { Lane, Race, Student } from "../common/models";
import AddRaceTable from "./AddRaceTable";
import { LaneStudent } from "./models";
import { addRaceReducer, AddRaceState } from "./reducers";

type ComponentProps = {
  students: Student[];
  onSaveRace: (race: Race) => void;
  onCancelAddRace: () => void;
  saveRaceError?: string;
}; 

function AddRaceManager(props: ComponentProps) {
  const initialState: AddRaceState = {
    laneStudents: [ 
      { laneName: '', student: null },
      { laneName: '', student: null } 
    ],
  }
  const [state, dispatch] = useReducer(addRaceReducer, initialState);

  return (
    <div>
      <div data-testid="add-race-manager-add-race-table">
        <AddRaceTable students={props.students} laneAssignments={state.laneStudents} 
          onEditLaneAssignment={(laneIndex: number, laneName: string, student: Student | null | undefined) => 
            dispatch({type: 'edit-lane-assignment', laneIndex: laneIndex, laneName: laneName, student: student})} 
          onRemoveLane={(laneIndex: number) => 
            dispatch({type: 'remove-lane', laneIndex: laneIndex})}
        />
      </div>
      <div>
        <button data-testid="add-race-manager-cancel-add-race-button" onClick={props.onCancelAddRace}>Cancel</button>
        <button data-testid="add-race-manager-add-lane-button" onClick={(e) => dispatch({type: 'add-lane'})}>Add Lane</button>
        <button data-testid="add-race-manager-save-race-button" onClick={(e) => saveRace(e, props, state)}>Save</button>
        <div data-testid="add-race-manager-error">{props.saveRaceError}</div>
      </div>
    </div>
  );
}

function saveRace(e: React.MouseEvent<HTMLInputElement>, props: ComponentProps, state: AddRaceState) {
  const lanes: Lane[] = state.laneStudents.map((laneStudent) => {
    return {name: laneStudent.laneName, student: laneStudent.student!}
  });
  const race: Race = { lanes: lanes };
  props.onSaveRace!(race);
}

export default AddRaceManager;
