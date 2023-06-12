import { expect, jest, test } from '@jest/globals';
import SessionManager from '../src/session-manager';

jest.useFakeTimers();
const mockUUID = 'mock-uuid';

let sm;

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sm = SessionManager(mockUUID);
});

describe('init', () => {
  test('with pass in uid', () => {
    expect(sm.getUID()).toBe(mockUUID);
  });

  test('with pass in uid after init', () => {
    sm = SessionManager();
    sm.setUID('new UID');
    expect(sm.getUID()).toBe('new UID');
  });

  test('with generated uid', () => {
    sm = SessionManager();
    expect(sm.getUID()).not.toBe(mockUUID);
  });

  test('with generated sid', () => {
    expect(sm.getSID()).not.toBeNull();
  });
});

describe('local storage', () => {
  test('stores uid', () => {
    expect(localStorage.getItem('va-uid')).toBe(mockUUID);
  });

  test('stores sid', () => {
    const sid = sm.getSID();
    expect(localStorage.getItem('va-key-sid')).toBe(sid);
  });
});

describe('sid', () => {
  test('is same for same session', () => {
    jest.setSystemTime(new Date(2000, 1, 1, 1, 0));
    const sid = sm.getSessionId();
    jest.setSystemTime(new Date(2000, 1, 1, 1, 29));
    const newSid = sm.getSessionId();
    expect(newSid).toBe(sid);
  });

  test('resets after session expires', () => {
    jest.setSystemTime(new Date(2000, 1, 1, 1, 0));
    const sid = sm.getSessionId();
    jest.setSystemTime(new Date(2000, 1, 1, 1, 31));
    const newSid = sm.getSessionId();
    expect(newSid).not.toBe(sid);
  });

  test('resets after force reset', () => {
    const sid = sm.getSessionId();
    sm.resetSession();
    const newSid = sm.getSessionId();
    expect(newSid).not.toBe(sid);
  });
});
