import { createFileRoute } from '@tanstack/react-router';
import { Trips } from '../../pages/Trips.tsx';

export const Route = createFileRoute('/trips/')({
  component: Trips
});
