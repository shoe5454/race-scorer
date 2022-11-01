import { Student, Race } from "../common/models";

type ComponentProps = {
  races: Race[];
  students: Student[];
  onAddResults: (race: Race, results: number[]) => void
}; 

function RaceTable(props: ComponentProps) {
  const rows = props.races.map((race, index) =>
    <tr data-testid="race-table-race-details-row" key={index}>
      <td>{index+1}</td>
      <td>1 - Ellie<br/>2 - David</td>
      <td>In Progress</td>
      <td><button>Add Results</button></td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Race ID</th>
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
