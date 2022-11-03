import { Student } from "../common/models";
import { LaneResult } from "./models";
import { AddResultsState, EditResultsAction, editResultsReducer } from "./reducers";

const dummyStudent1: Student = {
  name: 'Shu'
}
const dummyStudent2: Student = {
  name: 'Jennie'
}
const dummyStudent3: Student = {
  name: 'Benji'
}

test("reducer handles result assignment correctly", () => {
  let action: EditResultsAction, laneResults: LaneResult[], result: AddResultsState;

  const lanes = [
    { name: 'L1', student: dummyStudent1 },
    { name: 'L2', student: dummyStudent2 }
  ]

  // EditResultsAction updates a specific entry in laneResults accordingly
  laneResults = [ 
    { lane: lanes[0], result: null }, 
    { lane: lanes[1], result: null }, 
    { lane: lanes[2], result: null } 
  ];
  action = { lane: lanes[1], result: 1 };
  result = editResultsReducer({laneResults: laneResults}, action);
  expect(result.laneResults.length).toBe(3); 
  expect(result.laneResults[0].result).toBeNull();  
  expect(result.laneResults[1].result).toBe(1);  
  expect(result.laneResults[2].result).toBeNull();  

  // EditResultsAction does not update any entry in laneResults if lane is invalid (TODO)
});

