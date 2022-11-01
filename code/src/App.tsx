import React from 'react';
import AddRaceManager from './add-race/AddRaceManager';
import AddResultsManager from './add-results/AddResultsManager';
import './App.css';
import AppStateManager from './AppStateManager';
import { Race } from './common/models';
import Header from './Header';
import RaceManager from './races/RaceManager';

type ComponentProps = {
  stateManager: AppStateManager;
};

function App(props: ComponentProps) {
  let child;
  switch (props.stateManager.navPath) {
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
        <Header navPath={props.stateManager.navPath} onNavigateRaces={props.stateManager.onNavigateRaces} />
      </div>
      {child}
    </div>
  );
}

export default App;
