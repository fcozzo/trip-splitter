import { useFetchPerson, useUpdatePerson } from './helpers.ts';
import { PersonForm, type Person } from '../../components/PersonForm';

type EditPersonProps = {
  personId?: string;
};

export function EditPerson({ personId }: EditPersonProps) {
  const { data, isLoading } = useFetchPerson(personId);
  const { mutate: updatePerson } = useUpdatePerson();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (person: Person) => {
    updatePerson(
      { id: personId, ...person },
      {
        onSuccess: () => {
          alert('Success!');
        },
        onError: () => {
          alert('Error!');
        },
      },
    );
  };

  return <PersonForm onSubmit={handleSubmit} defaultValue={data} />;
}
