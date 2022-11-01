import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AppStateManager from './AppStateManager';
import { Race, Student } from './common/models';

const dummyStudent: Student = {
  name: 'Shu'
}

it("fails when provided bad constructor input", () => {
  // navPath = 'foobar' should throw error
  expect(() => {
    new AppStateManager('foobar');
  }).toThrow('Invalid navPath');
});

it("initializes state correctly", () => {
  // navPath should default to ...
  const stateManager = new AppStateManager();
  expect(stateManager.navPath).toBe('races');  
});

it("handles navigation state updates correctly", () => {
  let stateManager;
  const dummyRace: Race = {
    lanes: []
  };

  // Allow navigating to Add Race 'screen' (onAddRace)
  stateManager = new AppStateManager();
  stateManager.onAddRace();
  expect(stateManager.navPath).toBe('add-race');  
  
  // Allow navigating to Add Results 'screen' (onAddResults)
  stateManager = new AppStateManager();
  stateManager.onAddResults(dummyRace);
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
  stateManager.onAddResults(dummyRace);
  stateManager.onCancelAddResults();
  expect(stateManager.navPath).toBe('races');  
});

it("handles onSaveRace correctly", () => {
  // Add new race entries to the end of races (onSaveRace)
  const stateManager = new AppStateManager('add-race', [], []);
  const race1: Race = {
    lanes: []
  };
  stateManager.onSaveRace(race1);
  expect(stateManager.races.length).toBe(1);
  expect(stateManager.races[0]).toBe(race1);
  const race2: Race = {
    lanes: []
  };
  stateManager.onSaveRace(race2);
  expect(stateManager.races.length).toBe(2);
  expect(stateManager.races[0]).toBe(race1);
  expect(stateManager.races[1]).toBe(race2);
});

it("handles onSaveResults correctly", () => {
  let stateManager: AppStateManager, existingRace: Race, nonExistentRace: Race;

  // Add results to an existing race in races (onSaveResults)
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
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
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  stateManager = new AppStateManager('add-race', [], [existingRace]);
  expect(() => {
    stateManager.onSaveResults(existingRace, [1, 2, 3]);
  }).toThrow("Number of results does not match number of lanes");
  expect(() => {
    stateManager.onSaveResults(existingRace, [1]);
  }).toThrow("Number of results does not match number of lanes");
  expect(() => {
    stateManager.onSaveResults(existingRace, [1, 1]);
  }).toThrow("Non-sequential results");
  expect(() => {
    stateManager.onSaveResults(existingRace, [1, 3]);
  }).toThrow("Non-sequential results");
  expect(() => {
    stateManager.onSaveResults(existingRace, [3, 4]);
  }).toThrow("No first place winner");

  // Adding results to a non-existent race should throw an error
  existingRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  };
  nonExistentRace = {
    lanes: [
      {name: 'Lane1', student: dummyStudent}, {name: 'Lane2', student: dummyStudent},
    ]
  }
  stateManager = new AppStateManager('add-race', [], [existingRace]);
  expect(() => {
    stateManager.onSaveResults(nonExistentRace, [1, 2]);
  }).toThrow("Race does not exist");
});
