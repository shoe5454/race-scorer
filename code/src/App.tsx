import React, { useEffect, useReducer } from 'react';
import AddRaceManager from './add-race/AddRaceManager';
import AddResultsManager from './add-results/AddResultsManager';
import './App.css';
import { Lane, Race, Student } from './common/models';
import Header from './Header';
import RaceManager from './races/RaceManager';
import { AppState, appReducer, NavAction, SaveRaceAction, SaveResultsAction, AppAction } from './reducers';

type ComponentProps = {
  initialState: AppState;
};

function App(props: ComponentProps) {
  const [state, dispatch] = useReducer(appReducer, props.initialState);

  let child;
  if (state.navPath === 'races') {
    child = (
      <div data-testid="app-race-manager">
        <RaceManager 
          races={state.races} students={state.students} 
          onAddRace={() => dispatch(new NavAction('add-race'))} 
          onAddResults={(race: Race) => addResults(race, props, state, dispatch)} />
      </div>
    );
  } else if (state.navPath === 'add-race') {
    child = (
      <div data-testid="app-add-race-manager">
        <AddRaceManager 
          students={state.students}
          onSaveRace={(laneNames: string[], students: Array<Student | null>) => dispatch(new SaveRaceAction(laneNames, students))} 
          onCancelAddRace={() => dispatch(new NavAction('races'))} 
          saveRaceError={state.saveRaceError} />
      </div>
    );
  } else if (state.navPath.startsWith('add-results/')) {
    const raceIndex = parseInt(state.navPath.substring(12));
    child = (
      <div data-testid="app-add-results-manager">
        <AddResultsManager 
          race={state.races[raceIndex]} 
          onSaveResults={(results: Array<number | null>) => dispatch(new SaveResultsAction(state.races[raceIndex], results))} 
          onCancelAddResults={() => dispatch(new NavAction('races'))} />
      </div>
    );
  } else {
    child = (
      <div>
        Error: Invalid navPath
      </div>
    );    
  }

  return (
    <div>
      <div data-testid="app-header" className='App-header'>
        <Header navPath={state.navPath} onNavigateRaces={(e) => {dispatch(new NavAction('races')); e.preventDefault(); }} />
      </div>
      {child}
    </div>
  );
}

function addResults(
  race: Race, props: ComponentProps, state: AppState, 
  dispatch: { (appAction: AppAction): void; (navAction: NavAction): void; }
) {
  for (let i = 0; i < state.races.length; i++) {
    if (state.races[i] === race) {
      dispatch(new NavAction('add-results/' + i));
      return;
    }
  }
}

export default App;
