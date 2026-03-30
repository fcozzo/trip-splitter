import styles from './Trips.module.css';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card } from '../../libs/ui/Card.tsx';
import { CreateTripDialog } from '../CreateTripDialog';

import { useFetchTrips, useDeleteTrip } from './helpers.ts';

const getTripUrl = (id: string) => `/trips/${encodeURIComponent(id)}`;

export function Trips() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: trips, isPending: isTripsLoading } = useFetchTrips();
  const { mutate: deleteTrip } = useDeleteTrip();

  if (isTripsLoading) {
    return <h2>Loading</h2>;
  }

  const handleNewTripClick = () => {
    setShowCreateDialog(true);
  };

  const handleDelete = (id: string) => {
    return () => {
      deleteTrip(id, {
        onSuccess: () => {
          alert('Successfully deleted');
        },
        onError: () => {
          alert('Failed to delete trip');
        },
      });
    };
  };

  return (
    <>
      <div className={styles.trips}>
        <h2>Trips</h2>
        <button onClick={handleNewTripClick}>New Trip</button>
        <ul className={styles.tripList}>
          {trips?.map(({ id, name }) => (
            <li key={id} className={styles.tripListItem}>
              <Card asChild key={id}>
                <Link to={getTripUrl(id)}>{name}</Link>
              </Card>
              <button onClick={handleDelete(id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
      <CreateTripDialog
        open={showCreateDialog}
        onClose={() => {
          setShowCreateDialog(false);
        }}
      />
    </>
  );
}
