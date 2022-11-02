import React, { useReducer } from 'react';
import AddRaceManager from './add-race/AddRaceManager';
import AddResultsManager from './add-results/AddResultsManager';
import './App.css';
import AppStateManager from './AppStateManager';
import { Race } from './common/models';
import Header from './Header';
import RaceManager from './races/RaceManager';
import { navReducer } from './reducers';

type ComponentProps = {
  initialNavPath: string;
};

function App(props: ComponentProps) {
  const [navState, dispatch] = useReducer(navReducer, { navPath: props.initialNavPath });

  let child;
  switch (navState.navPath) {
    case "races":
      child = (
        <div data-testid="app-race-manager">
          <RaceManager races={props.stateManager.races} students={props.stateManager.students} onAddRace={props.stateManager.onAddRace} onAddResults={props.stateManager.onAddResults} />
        </div>
      );
      break;
    case "add-race":
      child = (
        <div data-testid="app-add-race-manager">
          <AddRaceManager />
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
    <div className="App">
      <div data-testid="app-header">
        <Header navPath={navState.navPath} onNavigateRaces={props.stateManager.onNavigateRaces} />
      </div>
      {child}
    </div>
  );
}

export default App;
