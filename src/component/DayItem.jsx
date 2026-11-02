import { Link } from "react-router-dom";

const DayItem = ({ day }) => {
  return (
    <tr>
      <td>{day.name}</td>
      <td>
        {day.meds && day.meds.length ? (
          <ul>
            {day.meds.map(m => (
              <li key={m.id}>{m.name} — {m.dosage}</li>
            ))}
          </ul>
        ) : (
          <span>No medications</span>
        )}
      </td>
      <td>
        <Link to={`/day/${day.id}`}><button className="btn">Open</button></Link>
      </td>
    </tr>
  );
};

export default DayItem;
