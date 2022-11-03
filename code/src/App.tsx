import React, { useEffect, useReducer } from 'react';
import AddRaceManager from './add-race/AddRaceManager';
import AddResultsManager from './add-results/AddResultsManager';
import './App.css';
import { Lane, Race, Student } from './common/models';
import Header from './Header';
import RaceManager from './races/RaceManager';
import { AppState, appReducer, NavAction, SaveRaceAction } from './reducers';

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
          onAddResults={() => dispatch(new NavAction('add-results'))} />
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
  } else if (state.navPath === 'add-results') {
    child = (
      <div data-testid="app-add-results-manager">
        <AddResultsManager race={} onSaveResults={} onCancelAddResults={} />
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

export default App;
