import { createFileRoute } from '@tanstack/react-router';
import { People } from '../../pages/People/People';

export const Route = createFileRoute('/people/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <People />;
}
