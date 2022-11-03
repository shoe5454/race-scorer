import React, { useReducer } from "react";
import { Lane, Race, Student } from "../common/models";
import AddResultsTable from "./AddResultsTable";
import { AddResultsState, editResultsReducer } from "./reducers";

type ComponentProps = {
  race: Race;
  onSaveResults: (lanes: Lane[], results: Array<number | null>) => void;
  onCancelAddResults: () => void;
  saveResultsError?: string;
}; 

function AddResultsManager(props: ComponentProps) {
  const initialState: AddResultsState = {
    laneResults: props.race.lanes.map(lane => {
      return {lane: lane, result: null};
    })
  }
  const [state, dispatch] = useReducer(editResultsReducer, initialState);

  return (
    <div>
      <div data-testid="add-results-manager-add-race-table">
        <AddResultsTable race={props.race} resultAssignments={state.laneResults} 
          onEditResultAssignment={(lane: Lane, result: number | null | undefined) => 
            dispatch({lane: lane, result: result})} 
        />
      </div>
      <div>
        <button data-testid="add-results-manager-cancel-add-results-button" onClick={props.onCancelAddResults}>Cancel</button>
        <button data-testid="add-results-manager-save-results-button" onClick={(e) => saveRace(e, props, state)}>Save</button>
        <div data-testid="add-results-manager-error">{props.saveResultsError}</div>
      </div>
    </div>
  );
}

function saveRace(e: React.MouseEvent<HTMLButtonElement>, props: ComponentProps, state: AddResultsState) {
  const results = state.laneResults.map(laneResult => {
    return laneResult.result;
  });
  props.onSaveResults!(props.race.lanes, results);
}

export default AddResultsManager;
