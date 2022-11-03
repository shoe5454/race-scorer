import React, { useReducer } from 'react';
import AddRaceManager from './add-race/AddRaceManager';
import AddResultsManager from './add-results/AddResultsManager';
import './App.css';
import { Race } from './common/models';
import Header from './Header';
import RaceManager from './races/RaceManager';
import { appModelReducer, AppModelState, navReducer, NavState } from './reducers';

type ComponentProps = {
  initialNavState: NavState;
  initialAppModelState: AppModelState;
};

function App(props: ComponentProps) {
  const [navState, dispatchNavAction] = useReducer(navReducer, props.initialNavState);
  const [appModelState, dispatchAppModelAction] = useReducer(appModelReducer, props.initialAppModelState);

  let child;
  switch (navState.navPath) {
    case "races":
      child = (
        <div data-testid="app-race-manager">
          <RaceManager 
            races={appModelState.races} students={appModelState.students} 
            onAddRace={() => dispatchNavAction({navPath: 'add-race'})} 
            onAddResults={() => dispatchNavAction({navPath: 'add-results'})} />
        </div>
      );
      break;
    case "add-race":
      child = (
        <div data-testid="app-add-race-manager">
          <AddRaceManager 
            students={appModelState.students}
            onSaveRace={(race: Race) => dispatchAppModelAction({ type: 'save-race', race: race })} 
            onCancelAddRace={() => dispatchNavAction({navPath: 'races'})} />
        </div>
      );
      break;
    case "add-results":
      child = (
        <div data-testid="app-add-results-manager">
          <AddResultsManager />
        </div>
      );
      break;
    default:
      child = (
        <div>
          Error: Invalid navPath
        </div>
      );    
  }

  return (
    <div>
      <div data-testid="app-header" className='App-header'>
        <Header navPath={navState.navPath} onNavigateRaces={(e) => {dispatchNavAction({navPath: 'races'}); e.preventDefault(); }} />
      </div>
      {child}
    </div>
  );
}

export default App;
