import { useCallback, useState } from 'react';
import {
  Dialog,
  Content,
  Overlay,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import styles from './AddAttendeeDialog.module.css';
import { useFetchPeople } from '../../../People/helpers.ts';

type AddAttendeeDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddAttendee: (personId: string) => void;
  idsToExclude?: string[];
};

export function AddAttendeeDialog({
  open,
  onClose,
  onAddAttendee,
  idsToExclude,
}: AddAttendeeDialogProps) {
  const [attendee, setAttendee] = useState('');
  const { data: people } = useFetchPeople();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onAddAttendee(attendee);

      setAttendee('');

      // createTrip(
      //   { name: tripName },
      //   {
      //     onSuccess: () => {
      //       alert('Successfully added attendee');
      //     },
      //     onError: (e) => {
      //       alert(`Error adding attendee\n\n${e.toString()}`);
      //     },
      //     onSettled: () => {
      //       onClose();
      //     },
      //   },
      // );
    },
    [attendee, onAddAttendee],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) onClose();
      }}
    >
      <Overlay className={styles.overlay}>
        <Content className={styles.content}>
          <form onSubmit={handleSubmit}>
            <Title>Add an Attendee</Title>
            <Description>
              <select
                name="tripName"
                type="text"
                required
                value={attendee}
                onChange={(e) => {
                  setAttendee(e.target.value);
                }}
              >
                <option value="">Select a person</option>
                {people
                  ?.filter(({ id }) => !idsToExclude?.includes(id))
                  ?.map(({ id, firstName }) => (
                    <option key={id} value={id}>
                      {firstName}
                    </option>
                  ))}
              </select>
            </Description>
            <Close onClick={onClose}>Close</Close>
            <button type="submit">Add</button>
          </form>
        </Content>
      </Overlay>
    </Dialog>
  );
}
