class AppStateManager {
  navPath: string;
  students: number[];
  races: number[];

  constructor(navPath = 'races', students: number[] = [], races: number[] = []) {
    this.navPath = navPath;
    this.students = students;
    this.races = races;
  }

  onNavigateRaces() {

  }
}

export default AppStateManager;