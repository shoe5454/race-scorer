import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AppStateManager from './AppStateManager';
import { Race, Student } from './common/models';

const dummyStudent: Student = {
  name: 'Shu'
}

test("navReducer allows valid navPaths", () => {
  let action, result;

  // Allow navigating to Add Race path
  action = { navPath: 'add-race' };
  result = navReducer({}, action);
  expect(result.navPath).toBe('add-race');  
  
  // Allow navigating to Add Results path
  action = { navPath: 'add-results' };
  result = navReducer({}, action);
  expect(result.navPath).toBe('add-results');  
  
  // Allow navigating back to Races path from Add Race path
  action = { navPath: 'races' };
  result = navReducer({ navPath: 'add-race' }, action);
  expect(result.navPath).toBe('races');  

  // Allow navigating back to Races path from Add Results path
  action = { navPath: 'races' };
  result = navReducer({ navPath: 'add-results' }, action);
  expect(result.navPath).toBe('races');  
});

test("navReducer does not allow invalid navPaths", () => {
  // navPath = 'foobar' should not be allowed
  const action = { navPath: 'foobar' };
  const result = navReducer({}, action);
  expect(result.navPath).toBe('foobar');  
});

test("appModelReducer handles save-race correctly", () => {
  let action, result: AppModelState;

  // Add new race entries to the end of races
  const initialState: AppModelState = {
    races: [],
    students: []
  };
  const race1: Race = {
    lanes: [ { name: 'Shu', student: dummyStudent }]
  };
  action = { type: 'save-race', race: race1 };
  result = appModelReducer(initialState, action);
  expect(result.races.length).toBe(1);  
  expect(result.races[0].lanes[0].name).toBe('Shu');
  const race2: Race = {
    lanes: []
  };
  action = { type: 'save-race', race: race2 };
  result = appModelReducer(result, action);
  expect(result.races.length).toBe(2);  
  expect(result.races[0].lanes[0].name).toBe('Shu');
  expect(result.races[1].lanes.length).toBe(0);

  // TODO Adding a race with less than 2 lanes should return an error

  // TODO Adding a race whose lanes have the same name should return an error

  // TODO Adding a race whose lanes have the same student should return an error
});

test("modelReducer handles save-results correctly", () => {
  let initialState: AppModelState, action, result: AppModelState, existingRace: Race, nonExistentRace: Race;

  // Add results to an existing race in races
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  initialState = {
    races: [ existingRace ],
    students: []
  };
  action = { type: 'save-results', race: existingRace, results: [1, 2] };
  result = appModelReducer(initialState, action);
  expect(result.races[0].lanes.length).toBe(2);
  expect(result.races[0].lanes[0].result).toBe(1);
  expect(result.races[0].lanes[1].result).toBe(2);


  // Adding invalid results should return error
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  initialState = {
    races: [ existingRace ],
    students: []
  };
  action = { type: 'save-results', race: existingRace, results: [1, 2, 3] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("Number of results does not match number of lanes");
  action = { type: 'save-results', race: existingRace, results: [1] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("Number of results does not match number of lanes");
  action = { type: 'save-results', race: existingRace, results: [1, 1] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("Non-sequential results");
  action = { type: 'save-results', race: existingRace, results: [1, 3] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("Non-sequential results");
  action = { type: 'save-results', race: existingRace, results: [3, 4] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("No first place winner");

  // Adding results to a non-existent race should return an error
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  nonExistentRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  initialState = {
    races: [ existingRace ],
    students: []
  };
  action = { type: 'save-results', race: nonExistentRace, results: [1, 2] };
  result = appModelReducer(initialState, action);
  expect(result.saveResultsError).toBe("Race does not exist");
});
