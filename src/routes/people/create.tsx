import { createFileRoute } from '@tanstack/react-router';
import { CreatePerson } from '../../pages/CreatePerson/CreatePerson.tsx';

export const Route = createFileRoute('/people/create')({
  component: CreatePerson,
});
