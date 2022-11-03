import { Race, Student } from './common/models';
import { navReducer, NavAction, AppAction, AppState, SaveRaceAction, saveRaceReducer, saveResultsReducer, SaveResultsAction } from './reducers';

const dummyStudent1: Student = {
  name: 'Shu'
}
const dummyStudent2: Student = {
  name: 'Jennie'
}
const dummyStudent3: Student = {
  name: 'Benji'
}

test("navReducer allows valid navPaths", () => {
  let action: NavAction, result: AppState;

  // Allow navigating to Add Race path
  action = new NavAction('add-race');
  result = navReducer({navPath: 'races', races: [], students: []}, action);
  expect(result.navPath).toBe('add-race');  
  
  // Allow navigating to Add Results path
  action = new NavAction('add-results/0');
  result = navReducer({navPath: 'races', races: [], students: []}, action);
  expect(result.navPath).toBe('add-results/0');  
  
  // Allow navigating back to Races path from Add Race path
  action = new NavAction('races');
  result = navReducer({navPath: 'add-race', races: [], students: []}, action);
  expect(result.navPath).toBe('races');  

  // Allow navigating back to Races path from Add Results path
  action = new NavAction('races');
  result = navReducer({navPath: 'add-results/0', races: [], students: []}, action);
  expect(result.navPath).toBe('races');  
});

test("navReducer does not allow invalid navPaths", () => {
  let action, result;

  // navPath = 'foobar' should not be allowed
  action = new NavAction('foobar');
  result = navReducer({navPath: 'races', races: [], students: []}, action);
  expect(result.navPath).toBe('races');  

  // navPath = 'add-results' should not be allowed (missing index)
  action = new NavAction('add-results');
  result = navReducer({navPath: 'races', races: [], students: []}, action);
  expect(result.navPath).toBe('races');  
});

test("saveRaceReducer validates before saving", () => {
  let action: SaveRaceAction, result: AppState;

  const initialState: AppState = {
    navPath: 'races',
    races: [],
    students: []
  };

  // Adding a race with less than 2 lanes should return an error
  action = new SaveRaceAction(['Lane Shu'], [dummyStudent1]);
  result = saveRaceReducer(initialState, action);
  expect(result.saveRaceError).toBe("Minimum 2 lanes");
  expect(result.races.length).toBe(0);

  // Adding a race where any lane has an empty name or student should return an error
  action = new SaveRaceAction(['', 'Lane Shu'], [null, dummyStudent1]);
  result = saveRaceReducer(initialState, action);
  expect(result.saveRaceError).toBe("Missing lane name / student");
  expect(result.races.length).toBe(0);

  // TODO Adding a race where number of lanes does not match number of students should return an error

  // TODO Adding a race whose lanes have the same name should return an error

  // TODO Adding a race whose lanes have the same student should return an error
});

test("saveRaceReducer saves a valid race correctly", () => {
  let action: SaveRaceAction, result: AppState;

  const initialState: AppState = {
    navPath: 'races',
    races: [],
    students: []
  };

  // Adding a race should append that races to the end of the existing races
  action = new SaveRaceAction(['Lane Shu', 'Lane Jennie'], [dummyStudent1, dummyStudent2]);
  result = saveRaceReducer(initialState, action);
  expect(result.races.length).toBe(1);  
  expect(result.races[0].lanes[0].name).toBe('Lane Shu');
  action = new SaveRaceAction(['Lane Shu', 'Lane Jennie', 'Lane Benji'], [dummyStudent1, dummyStudent2, dummyStudent3]);
  result = saveRaceReducer(result, action);
  expect(result.races.length).toBe(2);  
  expect(result.races[0].lanes[0].name).toBe('Lane Shu');
  expect(result.races[1].lanes.length).toBe(3);
});

test("saveResultsReducer validates before saving", () => {
  let initialState: AppState, action, result: AppState, existingRace: Race, nonExistentRace: Race;

  // Adding invalid results should return error
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent1}, {name: 'Lane2', student: dummyStudent2},
    ]
  };
  initialState = {
    navPath: 'races',
    races: [ existingRace ],
    students: []
  };
  action = new SaveResultsAction(existingRace, [1, null]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Missing results");
  action = new SaveResultsAction(existingRace, [1, 2, 3]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Number of results does not match number of lanes");
  action = new SaveResultsAction(existingRace, [1]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Number of results does not match number of lanes");
  action = new SaveResultsAction(existingRace, [1, 1]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Non-sequential results");
  action = new SaveResultsAction(existingRace, [1, 3]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Non-sequential results");
  action = new SaveResultsAction(existingRace, [3, 4]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("No first place winner");

  // Adding results to a non-existent race should return an error
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent1}, {name: 'Lane2', student: dummyStudent2},
    ]
  };
  nonExistentRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent1}, {name: 'Lane2', student: dummyStudent2},
    ]
  };
  initialState = {
    navPath: 'races',
    races: [ existingRace ],
    students: []
  };
  action = new SaveResultsAction(nonExistentRace, [1, 2]);
  result = saveResultsReducer(initialState, action);
  expect(result.saveResultsError).toBe("Race does not exist");
});

test("saveResultsReducer saves valid results correctly", () => {
  let initialState: AppState, action, result: AppState, existingRace: Race, nonExistentRace: Race;

  // Add results to an existing race in races
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent1}, {name: 'Lane2', student: dummyStudent2},
    ]
  };
  initialState = {
    navPath: 'races',
    races: [ existingRace ],
    students: []
  };
  action = new SaveResultsAction(existingRace, [1, 2]);
  result = saveResultsReducer(initialState, action);
  expect(result.races[0].lanes.length).toBe(2);
  expect(result.races[0].lanes[0].result).toBe(1);
  expect(result.races[0].lanes[1].result).toBe(2);
});
