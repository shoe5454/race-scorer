import { Race } from "./common/models";

class AppStateManager {
  navPath: string;
  students: Student[];
  races: Race[];

  constructor(navPath = 'races', students: Student[] = [], races: Race[] = []) {
    this.navPath = navPath;
    this.students = students;
    this.races = races;
  }

  onNavigateRaces() {

  }
}

export default AppStateManager;