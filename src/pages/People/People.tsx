import Card from '../../components/Card/Card.tsx';
import CardList from '../../components/CardList/CardList.tsx';

import { useDeletePerson, useFetchPeople } from './helpers';
import { Link } from '@tanstack/react-router';

function getPersonUrl(id: string): string {
  return `/people/${encodeURIComponent(id)}`;
}

export function People() {
  const { data: people, isLoading } = useFetchPeople();
  const { mutate: deletePerson } = useDeletePerson();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleDeleteClick = (personId: string) => {
    deletePerson(personId, {
      onSuccess: () => {
        alert('Success!');
      },
      onError: () => {
        alert('Error!');
      },
    });
  };

  return (
    <>
      <Link to="/people/create">New Person</Link>
      <CardList>
        {people.map(({ id, firstName }) => (
          <CardList.Item key={id}>
            <Card asChild>
              <Link to={getPersonUrl(id)}>{firstName}</Link>
            </Card>
            <button onClick={() => handleDeleteClick(id)}>Delete</button>
          </CardList.Item>
        ))}
      </CardList>
    </>
  );
}
