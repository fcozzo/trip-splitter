import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Trip } from '../../types';

async function fetchTrips() {
  const result = await fetch('http://localhost:3000/trip');

  if (!result.ok) {
    throw new Error(`${result.status}: ${result.statusText}`);
  }

  return (await result.json()) as Trip[];
}

export function useFetchTrips() {
  return useQuery({ queryKey: ['fetchTrips'], queryFn: fetchTrips });
}

async function deleteTrip(id: string) {
  const result = await fetch(`http://localhost:3000/trip/${id}`, {
    method: 'DELETE',
  });

  if (!result.ok) {
    throw new Error(`${result.status}: ${result.statusText}`);
  }

  return await result.json();
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: async () => {
      void queryClient.invalidateQueries({ queryKey: ['fetchTrips'] });
    },
  });
}
