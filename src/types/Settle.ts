import { Person } from "./Person.ts";

export type Settle = {
  date: string;
  payer: Person;
  payee: Person;
  amount: number;
  memo: string;
};
