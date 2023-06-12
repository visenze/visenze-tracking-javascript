export interface SessionManager {
  setUID(uid: string | null): void;
  getUID(): string;
  getSID(): string;
  generateUUID(): string;
  getSessionId(): string;
  resetSession(): string;
  getSessionTimeRemaining(): number;
}

export interface VAClient extends Omit<SessionManager, 'getSessionId'> {
  validateEvents(events: unknown, failCallback?: (err: Error) => void): boolean;
  sendEvent(
    action: string,
    eventParams: Record<string, unknown>,
    successCallback?: () => void,
    failCallback?: (err: unknown) => void
  ): void;
  sendEvents(
    action: string,
    eventParamsList: Record<string, unknown>[],
    successCallback?: () => void,
    failCallback?: (err: unknown) => void
  ): void;
  getDefaultTrackingParams(action?: string): Record<string, unknown>;
}

declare global {
  interface Window {
    ViSenzeAnalytics?: (configs: { code: string; uid?: string; isCN?: boolean; endpoint?: string }) => VAClient;
  }
}
