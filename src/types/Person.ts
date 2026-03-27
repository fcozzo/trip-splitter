export type Person = {
  personId: string
  firstName: string
  lastName: string
  phone: string
  email: string
};

export type Group = {
  group_id: string
  name: string
};

export type GroupPerson = {
  group_id: string
  person_id: string
};
