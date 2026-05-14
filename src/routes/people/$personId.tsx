import { createFileRoute } from '@tanstack/react-router';
import { EditPerson } from '../../pages/EditPerson/EditPerson.tsx';

export const Route = createFileRoute('/people/$personId')({
  component: PersonWrapper,
});

function PersonWrapper() {
  const { personId } = Route.useParams();

  return <EditPerson personId={personId} />;
}
