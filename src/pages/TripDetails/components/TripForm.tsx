import { type FormEvent, useState } from 'react';

import { TextInput } from '../../../components/TextInput/TextInput.tsx';
import { DateInput } from '../../../components/DateInput/DateInput';

const DEFAULT_VALUE = {
  name: '',
  startDate: '',
  endDate: '',
};

export function TripForm({ defaultValue = DEFAULT_VALUE, onSubmit }) {
  const [formData, setFormData] = useState(defaultValue);

  const { name = '', startDate = '', endDate = '' } = formData;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Trip name"
        name="name"
        value={name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <DateInput
        label="Start date"
        name="startDate"
        value={startDate}
        onChange={(e) => {
          setFormData({ ...formData, startDate: e.target.value });
        }}
      />
      <DateInput
        label="End date"
        name="endDate"
        value={endDate}
        onChange={(e) => {
          setFormData({ ...formData, endDate: e.target.value });
        }}
      />
      <button type="submit">Save</button>
    </form>
  );
}
