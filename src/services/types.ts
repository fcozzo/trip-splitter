import type { Trip, Expense, Settle } from "../types";

export type TripService = {
  fetchTrips: () => Promise<Trip[]>;
  fetchTrip: (tripId: string) => Promise<Trip>;
  fetchExpenses: (tripId: string) => Promise<Expense[]>;
  fetchSettles: (tripId: string) => Promise<Settle[]>;
};
