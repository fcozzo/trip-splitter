import type { Person } from './Person.ts';

export type Trip = {
  id: string
  name: string
  inviteGroup: InviteGroup
};

export type InviteGroup = {
  inviteGroupId: string
  invites: Invite[]
};

export type Invite = {
  person: Person
  attending: boolean
};
