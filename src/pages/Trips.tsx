import styles from "./Trips.module.css";
import { useEffect, useState } from "react";
import type { Trip } from "../types";
import { Card } from "../libs/ui/Card.tsx";

export function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  // TODO: use tanstack query
  // TODO: use zod for response validation
  useEffect(() => {
    fetch("http://localhost:3000/trip")
      .then((resp) => resp.json())
      .then((result) => setTrips(result));
  }, []);

  if (!trips.length) {
    return <h2>Loading</h2>;
  }

  const handleNewTripClick = () => {
    // TODO: modal for creating a new trip
    alert("done");
  };

  const getTripUrl = (id: string) => `/trips/${encodeURIComponent(id)}`;

  return (
    <div className={styles.trips}>
      <h2>Trips</h2>
      <button onClick={handleNewTripClick}>New Trip</button>
      <ul className={styles.tripList}>
        {trips.map(({ id, name }) => (
          <li>
            <Card asChild key={id}>
              <a href={getTripUrl(id)}>{name}</a>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
