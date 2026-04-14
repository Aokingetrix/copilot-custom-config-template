import type { CreatePlayerInput, PlayerDetail, PlayerSummary, UpdatePlayerInput } from './types';

class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const defaultApiBaseUrl = 'http://localhost:3000';

function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl;
}

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = await safeReadJson(response);
    const message = typeof payload === 'object' && payload !== null && 'error' in payload
      ? String((payload as { error: unknown }).error)
      : `Request failed with status ${response.status}`;

    throw new ApiError(response.status, message, payload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function safeReadJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function fetchPlayers(): Promise<PlayerSummary[]> {
  return requestJson<PlayerSummary[]>('/players');
}

export function fetchPlayer(playerId: number): Promise<PlayerDetail> {
  return requestJson<PlayerDetail>(`/players/${playerId}`);
}

export function createPlayer(input: CreatePlayerInput): Promise<PlayerDetail> {
  return requestJson<PlayerDetail>('/players', {
    method: 'POST',
    body: JSON.stringify({ player: input }),
  });
}

export function updatePlayer(playerId: number, input: UpdatePlayerInput): Promise<PlayerDetail> {
  return requestJson<PlayerDetail>(`/players/${playerId}`, {
    method: 'PATCH',
    body: JSON.stringify({ player: input }),
  });
}

export function loginPlayer(playerId: number): Promise<PlayerDetail> {
  return requestJson<PlayerDetail>(`/players/${playerId}/login`, {
    method: 'POST',
  });
}

export { ApiError };