import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchTrip(tripId: string) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}`,
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useFetchTrip(tripId: string) {
  return useQuery({
    queryKey: ['fetchTrip', tripId],
    queryFn: () => fetchTrip(tripId),
    enabled: !!tripId,
  });
}

async function updateTrip({ id: tripId, ...tripData }) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(tripData),
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchTrip'] }); // TODO: add trip ID to query key
    },
  });
}

async function removeAttendeeFromTrip({
  tripId,
  attendeeId,
}: {
  tripId: string;
  attendeeId: string;
}) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}/attendee/${encodeURIComponent(attendeeId)}`,
    { method: 'DELETE' },
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useRemoveAttendeeFromTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAttendeeFromTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchTrip'] });
    },
  });
}

async function addAttendee({
  tripId,
  attendeeId,
}: {
  tripId: string;
  attendeeId: string;
}) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}/attendee`,
    {
      method: 'POST',
      body: JSON.stringify({ attendeeId: +attendeeId }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useAddAttendee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAttendee,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchTrip'] });
    },
  });
}

async function addTransaction({ tripId, transaction }) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}/expense`,
    {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: async (_data, { tripId }) => {
      await queryClient.invalidateQueries({ queryKey: ['fetchTrip', tripId] });
    },
  });
}

async function removeTransaction({ tripId, transactionId }) {
  const result = await fetch(
    `http://localhost:3000/trip/${encodeURIComponent(tripId)}/expense/${encodeURIComponent(transactionId)}`,
    {
      method: 'DELETE',
    },
  );

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useRemoveTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTransaction,
    onSuccess: async (_data, { tripId }) => {
      await queryClient.invalidateQueries({ queryKey: ['fetchTrip', tripId] });
    },
  });
}
