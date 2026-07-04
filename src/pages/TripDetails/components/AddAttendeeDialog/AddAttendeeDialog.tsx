import { useCallback, useState } from 'react';
import { Dialog } from '@radix-ui';
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
    },
    [attendee, onAddAttendee],
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) onClose();
      }}
    >
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={styles.content}>
          <form onSubmit={handleSubmit}>
            <Dialog.Title>Add an Attendee</Dialog.Title>
            <Dialog.Description>
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
            </Dialog.Description>
            <Dialog.Close onClick={onClose}>Close</Dialog.Close>
            <button type="submit">Add</button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
