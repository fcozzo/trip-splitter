import { createFileRoute } from '@tanstack/react-router';

import { TripDetailsEdit } from '../../pages/TripDetails/components/TripDetailsEdit/TripDetailsEdit';

export const Route = createFileRoute('/trips/$tripId_/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { tripId } = Route.useParams();

  return <TripDetailsEdit tripId={tripId} />;
}
