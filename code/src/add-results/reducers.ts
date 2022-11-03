import { Lane, Student } from "../common/models";
import { LaneResult } from "./models";

export type AddResultsState = {
  laneResults: LaneResult[];
}

export type EditResultsAction = {
  lane: Lane;
  result?: number | null;
}

export function editResultsReducer(state: AddResultsState, action: EditResultsAction): AddResultsState {
  const edited = state.laneResults.map((laneResult, index) => {
    if (laneResult.lane !== action.lane) {
      return laneResult;
    } else {
      return { lane: laneResult.lane, result: action.result!};
    }
  });
  return { ...state, laneResults: edited};
}