import { Student } from "../common/models";
import { LaneStudent } from "./models";

export type AddRaceState = {
  laneStudents: LaneStudent[];
}

export type AddRaceAction = {
  type: string;
  laneIndex?: number;
  laneName?: string;
  student?: Student | null;
}

export function addRaceReducer(state: AddRaceState, action: AddRaceAction): AddRaceState {
  switch (action.type) {
    case 'add-lane':
      {
        return { ...state, laneStudents: [...state.laneStudents, {laneName: '', student: null} ] };
      }
    case 'remove-lane':
      {
        if (state.laneStudents.length <= 2) {
          return state;
        }
        const removed = state.laneStudents.filter((laneStudent, index) => index !== action.laneIndex);
        return { ...state, laneStudents: removed};
      }
    case 'edit-lane-assignment':
      {
        const edited = state.laneStudents.map((laneStudent, index) => {
          if (index !== action.laneIndex) {
            return laneStudent;
          } else {
            return { laneName: action.laneName!, student: action.student!};
          }
        });
        return { ...state, laneStudents: edited};
      }
    default:
      throw new Error('Unsupported type');
  }
}