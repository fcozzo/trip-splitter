/**
 * A service for fetching trip information from a local, hardcoded file
 */
import data from '../../data.ts';
import { type TripService } from '../types.ts';
import {
  type PersonRaw,
  type ExpenseRaw,
  type SettleRaw,
  type TripRaw,
  type InviteGroupRaw
} from './types.ts';
import type {
  Person,
  Expense,
  Settle,
  Trip,
  InviteGroup,
  Group,
  GroupPerson
} from '../../types';

type TempData = {
  expenses: ExpenseRaw[]
  people: PersonRaw[]
  settles: SettleRaw[]
  groups: Group[]
  groups_people: GroupPerson[]
  trips: TripRaw[]
  invite_groups: InviteGroupRaw[]
};

function tempData (): TempData {
  const tablesRaw = data
    .split('\n\n')
    .map((tableString: string) => tableString.split('\n'));

  const tableEntries = tablesRaw.map((tableRaw: string[]) => {
    const [name, columnString, ...rawRows] = tableRaw;

    const columnKeys = columnString.split(',');

    const rows = rawRows.map((rawRow: string) => {
      const rowValues = rawRow.split(',');

      const rowEntries = rowValues.map((value, ndx) => [
        columnKeys[ndx],
        value
      ]);

      return Object.fromEntries(rowEntries);
    });

    return [name, rows];
  });

  return Object.fromEntries(tableEntries);
}

function convertPerson (raw: PersonRaw): Person {
  return {
    personId: raw.id,
    firstName: raw.first_name,
    lastName: raw.last_name,
    phone: raw.phone,
    email: raw.email
  };
}

async function fetchTrips (): Promise<Trip[]> {
  const trips: Trip[] = [];

  const rawData = tempData();

  rawData.trips.forEach(({ trip_id, name, invite_group_id }) => {
    const rawInviteGroup = rawData.invite_groups.filter(
      (group) => group.invite_group_id === invite_group_id
    );

    if (rawInviteGroup.length === 0) return;

    const inviteGroup: InviteGroup = {
      inviteGroupId: invite_group_id,
      invites: rawInviteGroup.map((rawInvite) => {
        const rawPerson = rawData.people.find(
          (person) => person.id === rawInvite.person_id
        );

        if (!rawPerson) throw new Error('no person found');

        const person: Person = convertPerson(rawPerson);

        return {
          person,
          attending: rawInvite.attending === 'Y'
        };
      })
    };

    const trip: Trip = { tripId: trip_id, name, inviteGroup };

    trips.push(trip);
  });

  return trips;
}

async function fetchTrip (tripId: string): Promise<Trip> {
  const trips = await fetchTrips();

  const trip = trips.find((trip) => trip.tripId === tripId);

  if (!trip) throw new Error('Trip not found');

  return trip;
}

async function fetchExpenses (tripId: string): Promise<Expense[]> {
  const { expenses: expensesRaw, people: peopleRaw } = tempData();

  return expensesRaw
    .filter((expenseRaw) => expenseRaw.trip_id === tripId)
    .map(({ date, payer_id, amount, memo, split_group_id: splitGroupId }) => {
      const payerRaw = peopleRaw.find((person) => person.id === payer_id);
      const payer: Person = {
        personId: payerRaw?.id ?? '',
        firstName: payerRaw?.first_name ?? '',
        lastName: payerRaw?.last_name ?? '',
        phone: payerRaw?.phone ?? '',
        email: payerRaw?.email ?? ''
      };

      const expense: Expense = {
        date,
        amount: Number(amount),
        memo,
        payer,
        splitGroupId
      };

      return expense;
    });
}

async function fetchSettles (tripId: string): Promise<Settle[]> {
  const { settles: settlesRaw, people: peopleRaw } = tempData();

  return settlesRaw
    .filter(({ trip_id: settleTripId }) => settleTripId === tripId)
    .map(({ date, payer_id, payee_id, amount, memo }): Settle => {
      const payerRaw = peopleRaw.find((person) => person.id === payer_id);

      // TODO: better error handling?
      if (!payerRaw) throw new Error('no person found for payer_id');

      const payeeRaw = peopleRaw.find((person) => person.id === payee_id);

      // TODO: better error handling?
      if (!payeeRaw) throw new Error('no person found for payee_id');

      return {
        date,
        payee: convertPerson(payeeRaw),
        payer: convertPerson(payerRaw),
        amount: parseInt(amount, 10),
        memo
      };
    });
}

export const service: TripService = {
  fetchTrips,
  fetchTrip,
  fetchExpenses,
  fetchSettles
};
