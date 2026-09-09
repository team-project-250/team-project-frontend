import { Alert, Badge, Group, Loader, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

import { fetchHealth, fetchHello } from '../api/sanity';

type State =
  | { kind: 'loading' }
  | { kind: 'ok'; message: string; environment: string }
  | { kind: 'error'; reason: string };

/**
 * Sanity-check widget: calls the backend and shows whether the two parts of
 * the project talk to each other.
 */
export function BackendStatus() {
  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchHello(), fetchHealth()])
      .then(([hello, health]) => {
        if (!cancelled) {
          setState({
            kind: 'ok',
            message: hello.message,
            environment: health.environment,
          });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            kind: 'error',
            reason: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === 'loading') {
    return (
      <Group gap="xs">
        <Loader size="sm" />
        <Text c="dimmed">Contacting the backend…</Text>
      </Group>
    );
  }

  if (state.kind === 'error') {
    return (
      <Alert color="red" title="Backend unreachable">
        <Text size="sm">{state.reason}</Text>
        <Text size="sm" mt="xs">
          Start the API with <code>uvicorn app.main:app --reload</code> in the{' '}
          <strong>team-project-backend</strong> repository.
        </Text>
      </Alert>
    );
  }

  return (
    <Group gap="xs">
      <Badge color="green" variant="light">
        connected
      </Badge>
      <Text>
        Backend says: <strong>{state.message}</strong> ({state.environment})
      </Text>
    </Group>
  );
}
