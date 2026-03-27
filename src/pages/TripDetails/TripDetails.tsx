import './TripDetails.css';
import { useEffect, useState } from 'react';

// TODO: abstract a service switcher
import { service } from '../../services/hardcoded';
import type { Expense, Settle, Trip } from '../../types';
import { PersonOwed } from './components/PersonOwed.tsx';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// currency formatter
function centsToDollarsFmt (cents: number) {
  return USDollar.format(cents / 100);
}

type TripDetailsProps = {
  tripId: string
};

export function TripDetails ({ tripId }: TripDetailsProps) {
  // TODO: move the fetch functionality into the hardcoded service
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settles, setSettles] = useState<Settle[]>([]);

  useEffect(() => {
    // TODO: handle catching of errors
    service.fetchTrip(tripId).then((foundTrip) => {
      if (!foundTrip) {
        // TODO: handle this better?
        throw new Error('Trip not found!');
      }

      setTrip(foundTrip);
    });
    service.fetchExpenses(tripId).then((result) => { setExpenses(result); });
    service.fetchSettles(tripId).then((result) => { setSettles(result); });
  }, []);

  // TODO: handle loading better
  if (!trip) {
    return <h2>Loading</h2>;
  }

  const attendingList = trip.inviteGroup.invites.filter(
    ({ attending }) => attending
  );

  if (!attendingList || attendingList.length === 0) {
    // TODO: handle this better?
    throw new Error('Invite group not found!');
  }

  // calculate who spent money and how much everyone owes
  const spent: Record<string, number> = {};
  const totalLiable: Record<string, number> = {};

  expenses.forEach(({ payer, amount: amountString, splitGroupId }) => {
    const payerPreviousSpent = spent[payer.personId] || 0;

    const amount = Number(amountString);

    spent[payer.personId] = payerPreviousSpent + amount;

    // by default, split on everyone going on the trip
    const splitGroup = attendingList;

    if (splitGroupId !== '') {
      throw new Error('custom splits not implemented yet');
    }

    const costPerPerson = Math.round(amount / splitGroup.length);

    // TODO: calculate how much each person owed for this transaction
    splitGroup.forEach(({ person: { personId } }) => {
      const prevLiableAmount = totalLiable[personId] || 0;

      totalLiable[personId] = prevLiableAmount + costPerPerson;
    });
  });

  // factor in how much other people paid to settle
  settles.forEach(({ payer, payee, amount }) => {
    const payerPreviousSpent = spent[payer.personId] || 0;
    const payeePreviousSpent = spent[payee.personId] || 0;

    spent[payer.personId] = payerPreviousSpent + Number(amount);
    spent[payee.personId] = payeePreviousSpent - Number(amount);
  });

  const netOwedByPerson = attendingList
    .map((invitee) => {
      const person = invitee.person;

      if (!person) {
        // TODO: handle this better?
        throw new Error('Person not found!');
      }

      const netOwed =
        (spent[person.personId] || 0) - totalLiable[person.personId];

      return {
        id: person.personId,
        name: person.firstName,
        amountOwed: netOwed
      };
    })
    .sort((a, b) => a.amountOwed - b.amountOwed);

  return (
    <>
      <h2>{trip.name}</h2>
      {/* TODO: this should probably be a <table> element */}
      <div
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   maxWidth: "360px",
      //   gap: "8px",
      // }}
      >
        {netOwedByPerson.map(({ id, name, amountOwed }) => {
          return (
            <PersonOwed
              key={id}
              name={name}
              amountOwed={centsToDollarsFmt(amountOwed)}
            />
          );
        })}
      </div>
    </>
  );
}
