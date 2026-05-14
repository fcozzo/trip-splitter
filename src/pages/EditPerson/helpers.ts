import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import data from '../../data.ts';

async function fetchPerson(id: string) {
  const result = await fetch(`http://localhost:3000/person/${id}`, {
    method: 'GET',
  });

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useFetchPerson(id?: string) {
  return useQuery({
    queryKey: ['fetchPerson', id],
    queryFn: async () => await fetchPerson(id ?? ''),
    enabled: Boolean(id),
  });
}

async function updatePerson({ id, ...personData }) {
  const result = await fetch(`http://localhost:3000/person/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(personData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePerson,
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: ['fetchPerson', id.toString()],
      });
    },
  });
}
