import { Lane, Race, Student } from "./common/models";

export type AppState = {
  navPath: string;
  races: Race[];
  students: Student[];
  saveRaceError?: string;
  saveResultsError?: string;
}

export class AppAction {
}

export class NavAction extends AppAction {
  navPath: string;
  constructor(navPath: string) {
    super();
    this.navPath = navPath;
  }
}

export class SaveRaceAction extends AppAction {
  laneNames: string[];
  students: Array<Student | null>;
  constructor(laneNames: string[], students: Array<Student | null>) {
    super();
    this.laneNames = laneNames;
    this.students = students;
  }
}

export class SaveResultsAction extends AppAction {
  race: Race;
  results?: Array<number | null>;
  constructor(race: Race, results?: Array<number | null>) {
    super();
    this.race = race;
    this.results = results;
  }
}

export function appReducer(state: AppState, action: AppAction): AppState {
  if (action instanceof NavAction) {
    return navReducer(state, action);
  } else if (action instanceof SaveRaceAction) {
    return saveRaceReducer(state, action);
  } else if (action instanceof SaveResultsAction) {
    return saveResultsReducer(state, action);
  }
  throw new Error('Unsupported action');
}

export function navReducer(state: AppState, action: NavAction): AppState {
  if (
    action.navPath === 'races' ||
    action.navPath === 'add-race' ||
    action.navPath.startsWith('add-results/')
  ) {
    return { ...state, navPath: action.navPath, saveRaceError: undefined, saveResultsError: undefined};
  }
  return { ...state, navPath: state.navPath};
}

export function saveRaceReducer(state: AppState, action: SaveRaceAction): AppState {
  if (action.laneNames.length < 2 || action.students.length < 2) {
    return { ...state, saveRaceError: "Minimum 2 lanes" };
  }
  for (let i = 0; i < action.laneNames.length; i++) {
    if (action.laneNames[i] === null || action.laneNames[i].trim() === '') {
      return { ...state, saveRaceError: "Missing lane name / student" };
    }
    if (action.students[i] === null) {
      return { ...state, saveRaceError: "Missing lane name / student" };
    }
  }

  const lanes: Lane[] = [];
  for (let i = 0; i < action.laneNames.length; i++) {
    lanes.push({ name: action.laneNames[i], student: action.students[i]! })
  }
  const race: Race = {
    lanes: lanes
  }
  return { ...state, races: [...state.races, race], saveRaceError: undefined, navPath: 'races'};
}

export function saveResultsReducer(state: AppState, action: SaveResultsAction): AppState {
  const foundRace = state.races.find(race => race === action.race);

  // Validate
  if (!foundRace)
    return { ...state, saveResultsError: "Race does not exist" };
  if (action.results!.length != foundRace.lanes.length)
    return { ...state, saveResultsError: "Number of results does not match number of lanes" };
  for (let i = 1; i < action.results!.length; i++) {
    if (action.results![i] === null)
      return { ...state, saveResultsError: "Missing results" };
  }
  const copyOfResults  = Object.assign([], action.results);
  copyOfResults.sort();
  if (copyOfResults[0] != 1)
    return { ...state, saveResultsError: "No first place winner" };
  for (let i = 1; i < copyOfResults.length; i++) {
      if (copyOfResults[i] - copyOfResults[i-1] != 1)
        return { ...state, saveResultsError: "Non-sequential results" };
  }

  // Save results
  const newRaces: Race[] = state.races.map(race => {
    if (race === foundRace) {
      for (let i = 0; i < race.lanes.length; i++) {
        race.lanes[i].result = action.results![i]!;
      }              
    }
    return race;
  });
  return { ...state, races: newRaces, saveResultsError: undefined, navPath: 'races' };
}