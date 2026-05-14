import { useMutation } from '@tanstack/react-query';
import { produce } from 'immer';

async function createPerson(personData) {
  const result = await fetch(`http://localhost:3000/person`, {
    method: 'POST',
    body: JSON.stringify(emptyToNull(personData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.json();
}

export function useCreatePerson() {
  return useMutation({
    mutationFn: createPerson,
  });
}

// TODO: make this recursive
function emptyToNull(value: Record<string, unknown>) {
  return produce(value, (draft) => {
    for (const key in draft) {
      if (draft[key] === '') {
        draft[key] = null;
      }
    }
  });
}
