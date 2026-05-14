import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchPeople() {
  try {
    const response = await fetch('http://localhost:3000/person');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    alert(error);
  }
}

export function useFetchPeople() {
  return useQuery({ queryKey: ['fetchPeople'], queryFn: fetchPeople });
}

async function deletePerson(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/person/${encodeURIComponent(id)}`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    alert(error);
  }
}

export function useDeletePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePerson,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchPeople'] });
    },
  });
}
