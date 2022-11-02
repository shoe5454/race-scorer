
export type NavState = {
  navPath: string;
}

export type NavAction = {
  navPath: string;
}

export function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.navPath) {
    case 'races':
    case 'add-race':
    case 'add-results':
      return {navPath: action.navPath};
    default:
      return {navPath: state.navPath};
  }
}