import { Race, Student } from "./common/models";

export type NavState = {
  navPath: string;
}

export type NavAction = {
  navPath: string;
}

export function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.navPath) {
    case 'races':
    case 'add-race':
    case 'add-results':
      return {navPath: action.navPath};
    default:
      return {navPath: state.navPath};
  }
}

export type AppModelState = {
  races: Race[];
  students: Student[];
  saveRaceError?: string;
  saveResultsError?: string;
}

export type AppModelAction = {
  type: string;
  race: Race;
  results?: number[];
}

export function appModelReducer(state: AppModelState, action: AppModelAction): AppModelState {
  switch (action.type) {
    case 'save-race':
      {
        if (action.race.lanes.length < 2) {
          return { ...state, saveRaceError: "Minimum 2 lanes" };
        }
        return { ...state, races: [...state.races, action.race] };
      }
    case 'save-results':
      {
        const foundRace = state.races.find(race => race === action.race);

        // Validate
        if (!foundRace)
          return { ...state, saveResultsError: "Race does not exist" };
        if (action.results!.length != foundRace.lanes.length)
          return { ...state, saveResultsError: "Number of results does not match number of lanes" };
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
              race.lanes[i].result = action.results![i];
            }              
          }
          return race;
        });
        return { ...state, races: newRaces };
      }
    default:
      throw new Error('Unsupported type');
  }
}