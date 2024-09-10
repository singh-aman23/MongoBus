export default function BusResults({ buses }) {
  if (buses.length === 0) {
    return <p>No buses available for this route.</p>;
  }

  return (
    <div>
      <h2>Available Buses</h2>
      <ul>
        {buses.map((bus) => (
          <li key={bus._id}>
            Bus ID: {bus._id} - Route: {bus.starting_location} to{" "}
            {bus.ending_location}
          </li>
        ))}
      </ul>
    </div>
  );
}
