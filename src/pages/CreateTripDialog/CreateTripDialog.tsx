import { useCallback, useState } from 'react';
import {
  Dialog,
  Content,
  Overlay,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import styles from './CreateTripDialog.module.css';
import { useCreateTrip } from './helpers';

type CreateTripDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateTripDialog({ open, onClose }: CreateTripDialogProps) {
  const [tripName, setTripName] = useState('');
  const { mutate: createTrip } = useCreateTrip();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      createTrip(
        { name: tripName },
        {
          onSuccess: () => {
            alert('Successfully created trip');
          },
          onError: (e) => {
            alert(`Error creating trip\n\n${e.toString()}`);
          },
          onSettled: () => {
            onClose();
          },
        },
      );
    },
    [createTrip, onClose, tripName],
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
            <Title>Create New Trip</Title>
            <Description>
              <input
                name="tripName"
                type="text"
                required
                value={tripName}
                onChange={(e) => {
                  setTripName(e.target.value);
                }}
              />
            </Description>
            <Close onClick={onClose}>Close</Close>
            <button type="submit">Create</button>
          </form>
        </Content>
      </Overlay>
    </Dialog>
  );
}
