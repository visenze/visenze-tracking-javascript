import fetch, { Response } from 'node-fetch';
import URI from 'jsuri';
import SessionManager from './session-manager';
import { addData } from './data-collection';
import { version } from './version';
import { ViSenzeAnalytics } from '../types/shared';

const BASE_URL = 'https://analytics.data.visenze.com/v3';
const BASE_URL_CN = 'https://analytics.visenze.com.cn/v3';
const SDK = 'tracking js sdk';
const SDK_VERSION = version;
const TIMEOUT = 15000;

/**
 * @internal
 */
function _timeout(ms: number, promise: Promise<unknown>): Promise<unknown> {
  const to = new Promise((_, reject) =>
    setTimeout(() => reject(Error(`Timed out in ${ms} ms`)), ms)
  );
  return Promise.race([to, promise]);
}

/**
 * @internal
 */
const _sendRequest = (
  fetchObj: Promise<Response>,
  path: string,
  callback?: () => void,
  failure?: (errResoonse: any) => void
): Promise<void> => {
  return _timeout(TIMEOUT, fetchObj)
    .then((response: any) => {
      const status = response.status;
      if (status === 200) {
        return 'success';
      } else {
        const res: unknown = (response as Response).json();
        return res;
      }
    })
    .then((res) => {
      if (res === 'success') {
        if (callback) {
          callback();
        }
      } else {
        if (failure) {
          failure(res);
        }
      }
    })
    .catch((ex) => {
      if (failure) {
        failure(ex);
      }
    });
};

/**
 * @internal
 */
const _sendGetRequest = (
  path: string,
  params: Record<string, unknown>,
  callback?: () => void,
  failure?: (errResoonse: any) => void
): Promise<void> => {
  const uri = new URI(path);
  Object.entries(params).forEach(([key, value]) => {
    uri.addQueryParam(key, value as jsuri.Primitive);
  });
  const url = uri.toString();
  const fetchObj = fetch(url, {
    method: 'GET',
  });

  return _sendRequest(fetchObj, path, callback, failure);
};

export default function Tracker(configs: {
  code: string;
  uid?: string;
  isCN?: boolean;
  endpoint?: string;
}): ViSenzeAnalytics {
  const code = configs.code;
  const sessionManager = SessionManager(configs.uid);
  const isCN = !!configs.isCN;
  const endpoint = configs.endpoint;

  let baseUrl: string;
  if (endpoint) {
    baseUrl = endpoint;
  } else if (isCN) {
    baseUrl = BASE_URL_CN;
  } else {
    baseUrl = BASE_URL;
  }

  return {
    getUID(): string {
      return sessionManager.getUID();
    },
    setUID(uid: string): void {
      sessionManager.setUID(uid);
    },
    getSID(): string {
      return sessionManager.getSID();
    },
    resetSession(): string {
      return sessionManager.resetSession();
    },
    getSessionTimeRemaining(): number {
      return sessionManager.getSessionTimeRemaining();
    },
    generateUUID(): string {
      return sessionManager.generateUUID();
    },
    validateEvents(events: unknown, failCallback?: (Error) => void): boolean {
      if (!Array.isArray(events)) {
        failCallback?.(Error('events must be an array'));
        return false;
      }

      if (events.length <= 0) {
        failCallback?.(Error('events must have at least 1 item'));
        return false;
      }

      return true;
    },
    sendEvent(
      action: string,
      event: Record<string, unknown>,
      successCallback: () => void,
      failCallback: (err: any) => void
    ): void {
      const path = `${baseUrl}/__va.gif`;

      const defaultParams = this.getDefaultParams(action);
      const params = addData(defaultParams, event);
      _sendGetRequest(path, params, successCallback, failCallback);
    },
    sendEvents(
      action: string,
      events: Record<string, unknown>[],
      successCallback: () => void,
      failCallback: (err: any) => void
    ): void {
      if (!this.validateEvents(events, failCallback)) {
        return;
      }
      const batchId = sessionManager.generateUUID();
      events.forEach((event) => {
        if (action.toLowerCase() === 'transaction' && !event.transId) {
          event.transId = batchId;
        }
        this.sendEvent(action, event, successCallback, failCallback);
      });
    },
    getDefaultParams(action?: string): Record<string, unknown> {
      const defaultParams: Record<string, unknown> = {};
      defaultParams.code = code;
      defaultParams.sid = sessionManager.getSessionId();
      defaultParams.uid = sessionManager.getUID();
      defaultParams.sdk = SDK;
      defaultParams.v = SDK_VERSION;
      defaultParams.action = action;
      defaultParams.ts = new Date().getTime();
      return defaultParams;
    },
  };
}
