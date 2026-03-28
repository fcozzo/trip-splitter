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

type CreateTripDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateTripDialog({ open, onClose }: CreateTripDialogProps) {
  const [tripName, setTripName] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const result = await fetch('http://localhost:3000/trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tripName }),
      });

      if (result.status !== 201) {
        alert(`ERROR: ${result.status}`);
      } else {
        const response = await result.json();

        console.log(response);
        alert('SUCCESS!');
      }

      onClose();
    },
    [onClose, tripName],
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
