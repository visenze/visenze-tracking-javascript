import { expect, jest, test } from '@jest/globals';
import SessionManager from '../src/session-manager';
import Tracker from '../src/tracker';

const mockUID = 'mock-uid';
const mockGeneratedUUID = 'mock-generated-uuid';
const mockCallback = jest.fn();
const mockFailCallback = jest.fn();

const mockSessionManager = {
  generateUUID: jest.fn(() => mockGeneratedUUID),
};

let tracker;

jest.mock('../src/session-manager', () => {
  return jest.fn().mockImplementation((uid) => {
    return mockSessionManager;
  });
});

beforeEach(() => {
  tracker = Tracker({ uid: mockUID });
  jest.clearAllMocks();
});

describe('sendEvents', () => {
  beforeEach(() => {
    tracker.sendEvent = jest.fn();
  });

  test('invalid array without callback', () => {
    tracker.sendEvents('transaction', 'invalid');
    expect(tracker.sendEvent).toHaveBeenCalledTimes(0);
  });

  test('invalid array should not send event', () => {
    tracker.sendEvents('transaction', 'invalid', mockCallback, mockFailCallback);
    tracker.sendEvents('transaction', {}, mockCallback, mockFailCallback);
    tracker.sendEvents('transaction', '', mockCallback, mockFailCallback);
    tracker.sendEvents('transaction', null, mockCallback, mockFailCallback);

    expect(mockFailCallback).toBeCalledWith(Error('events must be an array'));
    expect(tracker.sendEvent).toHaveBeenCalledTimes(0);
  });

  test('empty array should not send event', () => {
    tracker.sendEvents('transaction', [], mockCallback, mockFailCallback);
    expect(mockFailCallback).toBeCalledWith(Error('events must have at least 1 item'));
    expect(tracker.sendEvent).toHaveBeenCalledTimes(0);
  });

  test('1 event in array', () => {
    const event1 = {};
    tracker.sendEvents('transaction', [event1], mockCallback, mockFailCallback);
    expect(mockSessionManager.generateUUID).toHaveBeenCalledTimes(1);
    expect(tracker.sendEvent).toHaveBeenCalledTimes(1);
    expect(event1.transId).toBe(mockGeneratedUUID);
  });

  test('2 events in array', () => {
    const event1 = {};
    const event2 = {};
    tracker.sendEvents('transaction', [event1, event2], mockCallback, mockFailCallback);
    expect(mockSessionManager.generateUUID).toHaveBeenCalledTimes(1);
    expect(tracker.sendEvent).toHaveBeenCalledTimes(2);
    expect(event1.transId).toBe(mockGeneratedUUID);
    expect(event2.transId).toBe(mockGeneratedUUID);
  });

  test('upper casing transaction', () => {
    const event1 = {};
    tracker.sendEvents('TRANSACTION', [event1], mockCallback, mockFailCallback);
    expect(mockSessionManager.generateUUID).toHaveBeenCalledTimes(1);
    expect(tracker.sendEvent).toHaveBeenCalledTimes(1);
    expect(event1.transId).toBe(mockGeneratedUUID);
  });

  test('non-transaction should not auto fill transId', () => {
    const event1 = {};
    tracker.sendEvents('add_to_cart', [event1], mockCallback, mockFailCallback);
    expect(mockSessionManager.generateUUID).toHaveBeenCalledTimes(1);
    expect(tracker.sendEvent).toHaveBeenCalledTimes(1);
    expect(event1.transId).toBe(undefined);
  });

  test('event with transId should not overwrite transId', () => {
    const event1 = { transId: 'mock-transId' };
    const event2 = {};
    tracker.sendEvents('transaction', [event1, event2], mockCallback, mockFailCallback);
    expect(mockSessionManager.generateUUID).toHaveBeenCalledTimes(1);
    expect(tracker.sendEvent).toHaveBeenCalledTimes(2);
    expect(event1.transId).toBe('mock-transId');
    expect(event2.transId).toBe(mockGeneratedUUID);
  });
});
