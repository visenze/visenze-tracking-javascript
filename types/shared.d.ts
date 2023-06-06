export interface VAClient {
  getUID(): string;
  setUID(uid: string): void;
  getSID(): string;
  resetSession(): string;
  getSessionTimeRemaining(): number;
  generateUUID(): string;
  validateEvents(events: unknown, failCallback?: (err: Error) => void): boolean;
  sendEvent(
    action: string,
    eventParams: Record<string, unknown>,
    successCallback: () => void,
    failCallback: (err: unknown) => void
  ): void;
  sendEvents(
    action: string,
    eventParamsList: Record<string, unknown>[],
    successCallback: () => void,
    failCallback: (err: unknown) => void
  ): void;
  getDefaultParams(action?: string): Record<string, unknown>;
}

declare global {
  interface Window {
    ViSenzeAnalytics?: (configs: { code: string; uid?: string; isCN?: boolean; endpoint?: string }) => VAClient;
  }
}
