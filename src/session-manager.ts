const SESSION_TIMEOUT = 1800000;
const KEY_UID = 'va-uid';
const KEY_SID = 'va-key-sid';
const KEY_SID_TIMESTAMP = 'va-key-sid-timestamp';

export default function SessionManager(
  user_uid?: string
): {
  isSameDay(t1: number, t2: number): boolean;
  setUID(uid: string | null): void;
  getSessionTimestamp(): number;
  getUID(): string;
  getSID(): string;
  generateUUID(): string;
  getSessionId(): string;
  resetSession(): string;
  getSessionTimeRemaining(): number;
} {
  let uid = '';

  if (user_uid) {
    uid = user_uid;
  }

  /**
   * @internal
   */
  const _setLocalStorage = (key: string, val: string): void => {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(key, val);
    }
  };

  /**
   * @internal
   */
  const _getLocalStorage = (key: string): string | null => {
    if (typeof Storage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  /**
   * @internal
   */
  const _removeLocalStorage = (key: string): void => {
    if (typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  return {
    isSameDay(t1: number, t2: number): boolean {
      const d1 = new Date(t1);
      const d2 = new Date(t2);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    },
    setUID(uid: string | null): void {
      if (uid) {
        _setLocalStorage(KEY_UID, uid);
      }
    },
    getSessionTimestamp(): number {
      const timestamp: string | null = _getLocalStorage(KEY_SID_TIMESTAMP);
      if (!timestamp) {
        const time = new Date().getTime();
        _setLocalStorage(KEY_SID_TIMESTAMP, time.toString());
        return time;
      }
      return parseInt(timestamp);
    },
    // get uid from local storage, if uuid is not created yet
    // create a new uuid and store in localstorage.
    getUID(): string {
      let uid = _getLocalStorage(KEY_UID);
      if (!uid) {
        uid = this.generateUUID();
        _setLocalStorage(KEY_UID, uid);
      }
      return uid;
    },
    //  get sid from local storage without resetting session timer
    // if sid is not created yet, then create a new sid and store in local storage
    getSID(): string {
      const sid = _getLocalStorage(KEY_SID);
      if (!sid) {
        return this.getSessionId();
      }

      return sid;
    },
    generateUUID(): string {
      let d = new Date().getTime();
      const uuid = 'xxxxxxxx.xxxx.4xxx.yxxx.xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
          const r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    // if sid is not created yet, then create a new sid and store in local storage
    getSessionId(): string {
      const now = new Date().getTime();
      let sid = _getLocalStorage(KEY_SID);
      const sessionTimestamp = this.getSessionTimestamp();

      if (
        !sid ||
        now - sessionTimestamp > SESSION_TIMEOUT ||
        !this.isSameDay(now, sessionTimestamp)
      ) {
        sid = this.generateUUID();
        _setLocalStorage(KEY_SID, sid);
      }

      _setLocalStorage(KEY_SID_TIMESTAMP, now.toString());
      return sid;
    },
    resetSession(): string {
      _removeLocalStorage(KEY_SID);
      _removeLocalStorage(KEY_SID_TIMESTAMP);
      return this.getSessionId();
    },
    getSessionTimeRemaining(): number {
      const now = new Date().getTime();
      const sessionTimestamp = _getLocalStorage(KEY_SID_TIMESTAMP);

      if (!sessionTimestamp) {
        return 0;
      }

      const timestamp = parseInt(sessionTimestamp);
      if (
        !this.isSameDay(now, timestamp) ||
        now - timestamp > SESSION_TIMEOUT
      ) {
        return 0;
      }

      return SESSION_TIMEOUT - (now - timestamp);
    },
  };
}
