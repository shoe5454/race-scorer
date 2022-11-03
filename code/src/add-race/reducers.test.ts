import { Student } from "../common/models";
import { AddRaceAction, addRaceReducer } from "./reducers";

const dummyStudent1: Student = {
  name: 'Shu'
}
const dummyStudent2: Student = {
  name: 'Jennie'
}
const dummyStudent3: Student = {
  name: 'Benji'
}

test("reducer handles add-lane correctly", () => {
  // add-lane adds a blank entry to the end of laneStudents
  const action: AddRaceAction = { type: 'add-lane' };
  const laneStudents = [
    { laneName: 'Existing Lane', student: dummyStudent1 },
  ];
  const result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(2);  
  expect(result.laneStudents[1].laneName).toBe('');  
  expect(result.laneStudents[1].student).toBeNull();  
});

test("reducer handles remove-lane correctly", () => {
  let action, laneStudents, result;

  // remove-lane removes the specified entry from laneStudents if existing laneStudents length is > 2
  action = { type: 'remove-lane', laneIndex: 0 };
  laneStudents = [
    { laneName: 'Existing Lane 1', student: dummyStudent1 },
    { laneName: 'Existing Lane 2', student: dummyStudent2 },
    { laneName: 'Existing Lane 3', student: dummyStudent3 },
  ];
  result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(2);  
  expect(result.laneStudents[0].laneName).toBe('Existing Lane 2');  
  expect(result.laneStudents[1].laneName).toBe('Existing Lane 3');  
  
  // remove-lane does not remove the specified entry from laneStudents if existing laneStudents length is <= 2
  action = { type: 'remove-lane', laneIndex: 1 };
  laneStudents = [
    { laneName: 'Existing Lane 1', student: dummyStudent1 },
    { laneName: 'Existing Lane 2', student: dummyStudent2 },
  ];
  result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(2);  
  expect(result.laneStudents[0].laneName).toBe('Existing Lane 1');  
  expect(result.laneStudents[1].laneName).toBe('Existing Lane 2');

  // remove-lane does not remove the specified entry from laneStudents if laneIndex is invalid
  action = { type: 'remove-lane', laneIndex: 3 };
  laneStudents = [
    { laneName: 'Existing Lane 1', student: dummyStudent1 },
    { laneName: 'Existing Lane 2', student: dummyStudent2 },
    { laneName: 'Existing Lane 3', student: dummyStudent3 },
  ];
  result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(3); 
  expect(result.laneStudents[0].laneName).toBe('Existing Lane 1');  
  expect(result.laneStudents[1].laneName).toBe('Existing Lane 2');
  expect(result.laneStudents[2].laneName).toBe('Existing Lane 3');
});
  
test("reducer handles edit-lane-assignment correctly", () => {
  let action, laneStudents, result;

  // edit-lane-assignment updates a specific entry in laneStudents accordingly
  action = { type: 'edit-lane-assignment', laneIndex: 0, laneName: 'def', student: dummyStudent2 };
  laneStudents = [ { laneName: 'Existing Lane 1', student: dummyStudent1 } ];
  result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(1); 
  expect(result.laneStudents[0].laneName).toBe('def');  
  expect(result.laneStudents[0].student?.name).toBe(dummyStudent2.name);  

  action = { type: 'edit-lane-assignment', laneIndex: 0, laneName: '', student: null };
  laneStudents = [ { laneName: 'Existing Lane 1', student: dummyStudent1 } ];
  result = addRaceReducer({laneStudents: laneStudents}, action);
  expect(result.laneStudents.length).toBe(1); 
  expect(result.laneStudents[0].laneName).toBe('');  
  expect(result.laneStudents[0].student).toBeNull(); 

  // edit-lane-assignment does not update any entry in laneStudents if laneIndex is invalid (TODO)
});

