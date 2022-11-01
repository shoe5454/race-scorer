import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import AppStateManager from './AppStateManager';
import Race from './common/models';

it("fails when provided bad constructor input", () => {
  // navPath = 'foobar' should throw error
  expect(() => {
    new AppStateManager('foobar');
  }).toThrow();
});

it("initializes state correctly", () => {
  // navPath should default to ...
  const stateManager = new AppStateManager();
  expect(stateManager.navPath).toBe('races');  
});

it("handles navigation state updates correctly", () => {
  let stateManager;

  // Allow navigating to Add Race 'screen' (onAddRace)
  stateManager = new AppStateManager();
  stateManager.onAddRace();
  expect(stateManager.navPath).toBe('add-race');  
  
  // Allow navigating to Add Results 'screen' (onAddResults)
  stateManager = new AppStateManager();
  stateManager.onAddResults(jest.fn());
  expect(stateManager.navPath).toBe('add-results');  
  
  // Allow navigating back to Races screen from Add Race screen (onCancelAddRace)
  stateManager = new AppStateManager();
  stateManager.onAddRace();
  stateManager.onCancelAddRace();
  expect(stateManager.navPath).toBe('races');  
  
  // Allow navigating back to Races screen from the Header (onNavigateRaces)
  stateManager = new AppStateManager();
  stateManager.onNavigateRaces();
  expect(stateManager.navPath).toBe('races');  
  
  // Allow navigating back to Races screen from Add Results screen (onCancelAddResults)
  stateManager = new AppStateManager();
  stateManager.onAddResults(jest.fn());
  stateManager.onCancelAddResults();
  expect(stateManager.navPath).toBe('races');  
});

it("handles model state updates correctly", () => {
  let stateManager: AppStateManager, existingRace: Race;

  // Add new race entries to the end of races (onSaveRace)
  stateManager = new AppStateManager('add-race', [], []);
  const race1: Race = {
  };
  stateManager.onSaveRace(race1);
  expect(stateManager.races.length).toBe(1);
  expect(stateManager.races[0]).toBe(race1);
  const race2: Race = {
  };
  stateManager.onSaveRace(race2);
  expect(stateManager.races.length).toBe(2);
  expect(stateManager.races[0]).toBe(race1);
  expect(stateManager.races[1]).toBe(race2);

  // Add results to an existing race in races (onSaveResults)
  existingRace = {
    lanes: [
      {}, {},
    ]
  };
  stateManager = new AppStateManager('add-race', [], [existingRace]);
  stateManager.onSaveResults(existingRace, [1, 2]);
  expect(stateManager.races[0].lanes.length).toBe(2);
  expect(stateManager.races[0].lanes[0].result).toBe(1);
  expect(stateManager.races[0].lanes[1].result).toBe(2);

  // Adding invalid results should throw error
  existingRace = {
    lanes: [
      {}, {},
    ]
  };
  stateManager = new AppStateManager('add-race', [], [existingRace]);
  expect(() => {
    stateManager.onSaveResults(existingRace, [1, 2, 3]);
  }).toThrow();
  expect(() => {
    stateManager.onSaveResults(existingRace, [1]);
  }).toThrow();
});
