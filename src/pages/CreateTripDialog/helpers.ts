import { useMutation, useQueryClient } from '@tanstack/react-query';

type TripInput = {
  name: string;
};

async function createTrip({ name }: TripInput) {
  const result = await fetch('http://localhost:3000/trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!result.ok) {
    throw new Error(`${result.status}: ${result.statusText}`);
  }

  return await result.json();
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['fetchTrips'] });
    },
  });
}
