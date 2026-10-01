import type { PublicStanding } from "@/lib/public-data/contracts";

type PublicStandingsTableProps = {
  standings: PublicStanding[];
};

export function PublicStandingsTable({ standings }: PublicStandingsTableProps) {
  if (standings.length === 0) {
    return <p>Dati classifica non ancora disponibili.</p>;
  }

  return (
    <div className="table-scroll">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Squadra</th>
            <th>Punti</th>
            <th>G</th>
            <th>V</th>
            <th>N</th>
            <th>P</th>
            <th>GF</th>
            <th>GS</th>
            <th>DR</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr key={standing.id}>
              <td>{standing.rank}</td>
              <td>{standing.teamName}</td>
              <td>{standing.points}</td>
              <td>{standing.played}</td>
              <td>{standing.won}</td>
              <td>{standing.drawn}</td>
              <td>{standing.lost}</td>
              <td>{standing.goalsFor}</td>
              <td>{standing.goalsAgainst}</td>
              <td>{standing.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
