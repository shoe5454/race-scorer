type ComponentProps = {
  navPath: string;
  onNavigateRaces: () => void;
}; 

function Header(props: ComponentProps) {
  switch (props.navPath) {
    case "races":
      return (
        <header>
          [ <span data-testid="header-races">Races</span> | Students (TODO) ]
        </header>
      );    
    case "add-race":
      return (
        <header>
          [ <a data-testid="header-races" onClick={props.onNavigateRaces}>Races</a> | Students (TODO) ]
        </header>
      );    
    case "add-results":
      return (
        <header>
          [ <a data-testid="header-races" onClick={props.onNavigateRaces}>Races</a> | Students (TODO) ]
        </header>
      );    
    default:
      return (
        <header>
          [ Error: Invalid navPath ]
        </header>
      );    
  }
}

export default Header;
