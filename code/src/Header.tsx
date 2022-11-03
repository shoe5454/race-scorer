type ComponentProps = {
  navPath: string;
  onNavigateRaces: (e: React.MouseEvent<HTMLElement>) => void;
}; 

function Header(props: ComponentProps) {
  if (props.navPath === 'races') {
    return (
      <header>
        [ <span data-testid="header-races">Races</span> | Students (TODO) ]
      </header>
    );    
  } else if (props.navPath === 'add-race') {
    return (
      <header>
        [ <a data-testid="header-races" onClick={props.onNavigateRaces} href="">Races</a> | Students (TODO) ]
      </header>
    );    
  } else if (props.navPath.startsWith('add-results/')) {
    return (
      <header>
        [ <a data-testid="header-races" onClick={props.onNavigateRaces} href="">Races</a> | Students (TODO) ]
      </header>
    );    
  }

  return (
    <header>
      [ Error: Invalid navPath ]
    </header>
  );    
}

export default Header;
