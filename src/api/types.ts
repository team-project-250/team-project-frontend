/** Response shapes returned by the backend. */

export interface MessageResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
  environment: string;
}
