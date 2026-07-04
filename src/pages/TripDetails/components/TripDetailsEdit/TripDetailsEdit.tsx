import { TripForm } from '../TripForm.tsx';
import {
  useAddAttendee,
  useFetchTrip,
  useRemoveAttendeeFromTrip,
  useUpdateTrip,
} from '../../helpers.ts';
import { AttendeesList } from '../AttendeesList/AttendeesList.tsx';
import { useState } from 'react';
import { AddAttendeeDialog } from '../AddAttendeeDialog/AddAttendeeDialog.tsx';

export function TripDetailsEdit({ tripId }) {
  const { data: trip, isLoading } = useFetchTrip(tripId);
  const [showAddAttendeeDialog, setShowAddAttendeeDialog] = useState(false);
  const { mutate: updateTrip } = useUpdateTrip();
  const { mutate: removeAttendeeFromTrip } = useRemoveAttendeeFromTrip();
  const { mutate: addAttendeeToTrip } = useAddAttendee();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{trip.name}</h2>
      <TripForm
        defaultValue={trip}
        onSubmit={(trip) => {
          updateTrip(trip, {
            onSuccess: () => {
              alert('Success!');
            },
            onError: () => {
              alert('Failure!');
            },
          });
        }}
      />
      <AttendeesList
        attendees={trip.attendees}
        onDelete={(attendeeId) => {
          removeAttendeeFromTrip({ tripId, attendeeId });
        }}
        onAddAttendee={(personId) => {
          addAttendeeToTrip({ tripId, personId });
        }}
      />
      <button
        onClick={() => {
          setShowAddAttendeeDialog(true);
        }}
      >
        Add Attendee
      </button>
      <AddAttendeeDialog
        open={showAddAttendeeDialog}
        onClose={() => {
          setShowAddAttendeeDialog(false);
        }}
        idsToExclude={trip.attendees.map(({ id }) => id)}
        onAddAttendee={(attendeeId) => {
          addAttendeeToTrip(
            { tripId, attendeeId },
            {
              onSuccess: () => {
                setShowAddAttendeeDialog(false);
              },
            },
          );
        }}
      />
    </>
  );
}
