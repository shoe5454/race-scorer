import { Student, Race } from "../common/models";

type ComponentProps = {
  races: Race[];
  students: Student[];
  onAddResults: (race: Race, results: number[]) => void
}; 

function RaceTable(props: ComponentProps) {
  const rows = props.races.map((race, index) =>
    <tr data-testid="race-table-race-details-row" key={index}>
      <td data-testid="race-details-row-lanes">
        <div data-testid="race-details-row-lane">1 - Ellie</div>
        <div data-testid="race-details-row-lane">2 - David</div>
      </td>
      <td data-testid="race-details-row-results">In Progress</td>
      <td><button data-testid="race-details-row-add-results-button">Add Results</button></td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Lanes</th>
          <th>Results (Winner First)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

export default RaceTable;
