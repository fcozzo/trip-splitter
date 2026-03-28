import styles from './Trips.module.css';
import { useEffect, useState } from 'react';
import type { Trip } from '../types';
import { Card } from '../libs/ui/Card.tsx';
import { CreateTripDialog } from './CreateTripDialog';

export function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // TODO: use tanstack query
  // TODO: use zod for response validation
  useEffect(() => {
    fetch('http://localhost:3000/trip')
      .then(async (resp) => await resp.json())
      .then((result) => {
        setTrips(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (trips.length === 0) {
    return <h2>Loading</h2>;
  }

  const handleNewTripClick = () => {
    setShowCreateDialog(true);
  };

  const getTripUrl = (id: string) => `/trips/${encodeURIComponent(id)}`;

  return (
    <>
      <div className={styles.trips}>
        <h2>Trips</h2>
        <button onClick={handleNewTripClick}>New Trip</button>
        <ul className={styles.tripList}>
          {trips.map(({ id, name }) => (
            <li key={id}>
              <Card asChild key={id}>
                <a href={getTripUrl(id)}>{name}</a>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <CreateTripDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />
    </>
  );
}
