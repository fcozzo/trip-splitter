import { useNavigate } from '@tanstack/react-router';
import { useCreatePerson } from './helpers.ts';
import { PersonForm, type Person } from '../../components/PersonForm';

export function CreatePerson() {
  const { mutate: createPerson } = useCreatePerson();
  const navigate = useNavigate();

  const handleSubmit = (person: Person) => {
    createPerson(person, {
      onSuccess: () => {
        alert('Success!');
        navigate({ to: '/people' });
      },
      onError: () => {
        alert('Error!');
      },
    });
  };

  return <PersonForm onSubmit={handleSubmit} buttonLabel={'Create'} />;
}
