import React from 'react';
import { TextInput } from '../TextInput/TextInput.tsx';
import type { Person } from './types.ts';

const EMPTY_PERSON: Person = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

type PersonFormProps = {
  onSubmit: (person: Person) => void;
  defaultValue?: Person;
  buttonLabel?: string;
};

export function PersonForm({
  defaultValue,
  onSubmit,
  buttonLabel,
}: PersonFormProps) {
  const [person, setPerson] = React.useState(defaultValue ?? EMPTY_PERSON);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="First name"
        value={person.firstName}
        onChange={(e) => setPerson({ ...person, firstName: e.target.value })}
      />
      <TextInput
        label="Last name"
        value={person.lastName}
        onChange={(e) => setPerson({ ...person, lastName: e.target.value })}
      />
      <TextInput
        label="Phone number"
        value={person.phone}
        onChange={(e) => setPerson({ ...person, phone: e.target.value })}
      />
      <TextInput
        label="Email address"
        value={person.email}
        onChange={(e) => setPerson({ ...person, email: e.target.value })}
      />
      <button type="submit">{buttonLabel ?? 'Save'}</button>
    </form>
  );
}
