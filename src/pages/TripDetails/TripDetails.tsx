import { styles } from './TripDetails.module.css';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Tabs } from 'radix-ui';

import type { Expense, Settle, Trip } from '../../types';
import { PersonOwed } from './components/PersonOwed.tsx';
import {
  useFetchTrip,
  useAddTransaction,
  useRemoveTransaction,
} from './helpers.ts';
import { TransactionList } from './components/TransactionList';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// currency formatter
function centsToDollarsFmt(cents: number) {
  return USDollar.format(cents / 100);
}

type TripDetailsProps = {
  tripId: string;
};

export function TripDetails({ tripId }: TripDetailsProps) {
  // TODO: move the fetch functionality into the hardcoded service
  const [settles, setSettles] = useState<Settle[]>([]);
  const { data: trip, isLoading } = useFetchTrip(tripId);
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: removeTransaction } = useRemoveTransaction();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const attendingList = trip.attendees;
  const expenses = trip.expenses;

  // calculate who spent money and how much everyone owes
  const spent: Record<string, number> = {};
  const totalLiable: Record<string, number> = {};

  expenses.forEach(({ payer, amount, splitGroupId }) => {
    const payerPreviousSpent = spent[payer.id] || 0;

    spent[payer.id] = payerPreviousSpent + amount;

    // // by default, split on everyone going on the trip
    const splitGroup = attendingList;

    // if (splitGroupId !== '') {
    //   throw new Error('custom splits not implemented yet');
    // }

    const costPerPerson = Math.round(amount / splitGroup.length);

    // TODO: calculate how much each person owed for this transaction
    splitGroup.forEach(({ id: personId }) => {
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
    .map((person) => {
      if (!person) {
        // TODO: handle this better?
        throw new Error('Person not found!');
      }

      const netOwed = (spent[person.id] || 0) - (totalLiable[person.id] || 0);

      return {
        id: person.id,
        name: person.firstName,
        amountOwed: netOwed,
      };
    })
    .sort((a, b) => a.amountOwed - b.amountOwed);

  return (
    <>
      <h2>
        {trip.name}{' '}
        <Link to="/trips/$tripId/edit" params={{ tripId }}>
          Edit
        </Link>
      </h2>

      <Tabs.Root defaultValue="tab1" orientation="vertical">
        <Tabs.List aria-label="trip views">
          <Tabs.Trigger value="transactions">
            <h3>Transactions</h3>
          </Tabs.Trigger>
          <Tabs.Trigger value="netOwed">
            <h3>Net Owed</h3>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="transactions">
          <TransactionList
            transactions={trip.expenses}
            onAddTransaction={(newTransaction) =>
              addTransaction({ tripId, transaction: newTransaction })
            }
            onRemoveTransaction={(transactionId) => {
              removeTransaction({ tripId, transactionId });
            }}
          />
        </Tabs.Content>
        <Tabs.Content value="netOwed">
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
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
