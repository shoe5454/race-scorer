import { Race, Student } from "./common/models";

class AppStateManager {
  static defaultStudents: Student[] = [
    {name: 'Shu'}, {name: 'Jennie'}, {name: 'Benji'}, {name: 'Lukas'}
  ];

  navPath: string;
  students: Student[];
  races: Race[];

  constructor(navPath = 'races', students: Student[] = AppStateManager.defaultStudents, races: Race[] = []) {
    if (navPath != 'races' && navPath != 'add-race' && navPath != 'add-results')
      throw new Error('Invalid navPath');
    this.navPath = navPath;
    this.students = students;
    this.races = races;
  }

  onNavigateRaces() {
    this.navPath = 'races';
  }

  onAddRace() {
    this.navPath = 'add-race';
  }

  onAddResults(race: Race) {
    this.navPath = 'add-results';
  }

  onCancelAddRace() {
    this.navPath = 'races';
  }

  onCancelAddResults() {
    this.navPath = 'races';
  }

  onSaveRace(race: Race) {
    this.races.push(race);
  }

  onSaveResults(existingRace: Race, results: number[]) {
    const foundRace = this.races.find(race => race === existingRace);

    // Validate
    if (!foundRace)
      throw new Error("Race does not exist");
    if (results.length != foundRace.lanes.length)
      throw new Error("Number of results does not match number of lanes");
    const copyOfResults  = Object.assign([], results);
    copyOfResults.sort();
    if (copyOfResults[0] != 1)
      throw new Error("No first place winner");
    for (let i = 1; i < copyOfResults.length; i++) {
        if (copyOfResults[i] - copyOfResults[i-1] != 1)
          throw new Error("Non-sequential results");
    }
    

    // Save results
    for (let i = 0; i < foundRace.lanes.length; i++) {
        foundRace.lanes[i].result = results[i];
    }
  }
}

export default AppStateManager;