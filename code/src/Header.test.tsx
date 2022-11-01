import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Header from './Header';

it('fails gracefully when provided bad props', () => {
  // Unrecognized navPath should display error
  const mockOnNavigateRaces = jest.fn();
  let {container} = render(<Header navPath="foobar" onNavigateRaces={mockOnNavigateRaces} />);
  expect(container).toHaveTextContent("Error: Invalid navPath");
});

it('displays the header correctly', () => {
  let mockOnNavigateRaces, tab, container;

  // navPath = 'races' should display but disable the Races tab
  mockOnNavigateRaces = jest.fn();
  ({container} = render(<Header navPath="races" onNavigateRaces={mockOnNavigateRaces} />));
  tab = within(container).getByText("Races");
  tab.click();
  expect(mockOnNavigateRaces).toHaveBeenCalledTimes(0);

  // navPath = 'add-race' should display and enable the Races tab
  mockOnNavigateRaces = jest.fn();
  ({container} = render(<Header navPath="add-race" onNavigateRaces={mockOnNavigateRaces} />));
  tab = within(container).getByText("Races");
  tab.click();
  expect(mockOnNavigateRaces).toHaveBeenCalledTimes(1);

  // navPath = 'add-results' should display and enable the Races tab
  mockOnNavigateRaces = jest.fn();
  ({container} = render(<Header navPath="add-results" onNavigateRaces={mockOnNavigateRaces} />));
  tab = within(container).getByText("Races");
  tab.click();
  expect(mockOnNavigateRaces).toHaveBeenCalledTimes(1);
});

it("integrates with the expected events", () => {
  // Races link is hooked to the onNavigateRaces callback
  const mockOnNavigateRaces = jest.fn();
  const {container} = render(<Header navPath="add-results" onNavigateRaces={mockOnNavigateRaces} />);
  const tab = within(container).getByTestId("header-races");
  tab.click();
  expect(mockOnNavigateRaces).toHaveBeenCalledTimes(1);  
});
