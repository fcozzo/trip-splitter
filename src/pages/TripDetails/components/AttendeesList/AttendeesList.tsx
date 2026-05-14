import CardList from '../../../../components/CardList/CardList.tsx';
import Card from '../../../../components/Card/Card.tsx';

export function AttendeesList({ attendees, onDelete }) {
  return (
    <CardList>
      {attendees?.map((attendee) => (
        <CardList.Item key={attendee.id}>
          <Card>
            {attendee.firstName} {attendee.lastName}
          </Card>
          <button onClick={() => onDelete(attendee.id)}>delete</button>
        </CardList.Item>
      ))}
    </CardList>
  );
}
