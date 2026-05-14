import styles from './TransactionList.module.css';
import { useEffect, useState } from 'react';

async function fetchNameOptions() {
  try {
    const result = await fetch('http://localhost:3000/person', {
      method: 'GET',
    });

    if (!result.ok) {
      throw new Error(`${result.status}: ${result.statusText}`);
    }

    const response = await result.json();

    return response.map(({ id, firstName }) => ({
      name: firstName,
      value: id,
    }));
  } catch (e) {
    console.error(e);
  }
}

export function TransactionList({
  transactions,
  onAddTransaction,
  onRemoveTransaction,
}) {
  const [namesLoaded, setNamesLoaded] = useState(false);
  const [nameOptions, setNameOptions] = useState<
    Array<{ name: string; value: string }>
  >([]);

  const [date, setDate] = useState<string>('');
  const [payer, setPayer] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (!namesLoaded) {
      fetchNameOptions()
        .then((options) => {
          setNamesLoaded(true);
          setNameOptions(options);
        })
        .catch((e) => {
          throw e;
        });
    }
  }, [namesLoaded]);

  const handleAdd = (e) => {
    e.preventDefault();

    onAddTransaction({
      date,
      payerId: +payer,
      amount: Math.round(Number(amount) * 100),
      note,
    });

    setAmount('');
    setNote('');
  };

  const createRemoveHandler = (transactionId) => (e) => {
    e.preventDefault();

    onRemoveTransaction(transactionId);
  };

  return (
    <form onSubmit={handleAdd}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Payer</th>
            <th scope="col">Amount</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, date, payer, amount, note }) => {
            // TODO: use centsToDollarsFmt
            const formattedAmount = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(amount / 100);

            return (
              <tr key={id}>
                <td>{date}</td>
                <td>{payer.firstName}</td>
                <td>{formattedAmount}</td>
                <td>{note}</td>
                <td>
                  <button type="button" onClick={createRemoveHandler(id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
              />
            </td>
            <td>
              <select
                name="payer"
                required
                disabled={!namesLoaded}
                value={payer}
                onChange={(e) => {
                  setPayer(e.target.value);
                }}
              >
                <option value=""></option>
                {nameOptions.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                name="amount"
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                name="note"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </td>
            <td>
              <button type="submit">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
