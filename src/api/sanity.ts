import { api } from './client';
import type { HealthResponse, MessageResponse } from './types';

/** Sanity endpoint — the backend answers with `Hello world!`. */
export const fetchHello = () => api.get<MessageResponse>('/api/hello');

/** Health probe used to show the connection status on the start page. */
export const fetchHealth = () => api.get<HealthResponse>('/api/health');
