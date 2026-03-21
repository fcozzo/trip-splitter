import { Person } from "./Person.ts";

export type Expense = {
  date: string;
  payer: Person;
  amount: number;
  memo: string;
  splitGroupId: string;
};
