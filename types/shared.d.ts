export interface ViSenzeAnalytics {
  getUID(): string;
  setUID(uid: string): void;
  getSID(): string;
  resetSession(): string;
  getSessionTimeRemaining(): number;
  generateUUID(): string;
  validateEvents(events: unknown, failCallback?: (Error) => void): boolean;
  sendEvent(
    action: any,
    event: any,
    successCallback: () => void,
    failCallback: (err: any) => void
  ): void;
  sendEvents(
    action: any,
    events: any,
    successCallback: () => void,
    failCallback: (err: any) => void
  ): void;
  getDefaultParams(action?: string): Record<string, unknown>;
}

declare global {
  interface Window {
    ViSenzeAnalytics?: (configs: {
      code: string;
      uid?: string;
      isCN?: boolean;
      endpoint?: string;
    }) => ViSenzeAnalytics;
  }
}
