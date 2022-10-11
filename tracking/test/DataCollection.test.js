const DataCollection = require('../src/DataCollection');


import { expect, jest, test } from '@jest/globals';

let dataCollection;

beforeEach(() => {
    dataCollection = new DataCollection();

    Object.defineProperty(navigator, 'language', {
        writable: true,
        value: 'default-lang'
    });

    Object.defineProperty(screen, 'width', {
        writable: true,
        value: 111
    });

    Object.defineProperty(screen, 'height', {
        writable: true,
        value: 222
    });

    Object.defineProperty(window, 'location', {
        writable: true,
        value: { href: 'default-url' }
    });

    Object.defineProperty(document, 'referrer', {
        writable: true,
        value: 'default-r'
    });
});

describe('addData', () => {

    test('user input will take priority except for some browser info', () => {

        const userInput = {
            action: 'user-action',
            sdk: 'user-sdk',
            v: 'user-v',

            // should not all user to indicate browser info
            lang: 'user-lang',
            sr: 'user-sr',
            url: 'user-url',
            r: 'user-r',
            db: 'user-db',
            dm: 'user-dm',
            os: 'user-os',
            osv: 'user-osv',
            p: 'user-p',
            web_host: 'user-web_host'
        };
        const defaultInput = {
            action: 'default-action',
            sdk: 'default-sdk',
            v: 'default-v',

            // should not all user to indicate browser info
            url: 'default-url',
            r: 'default-r',
            db: 'default-db',
            dm: 'default-dm',
            os: 'default-os',
            osv: 'default-osv',
            p: 'default-p',
            web_host: 'default-web_host'
        };

        const result = dataCollection.addData(defaultInput, userInput);
        expect(result.action).toBe('user-action');
        expect(result.sdk).toBe('user-sdk');
        expect(result.v).toBe('user-v');

        expect(result.lang).toBe('default-lang');
        expect(result.sr).toBe('111x222');
        expect(result.url).toBe('default-url');
        expect(result.r).toBe('default-r');

        expect(result.db).toBeNull();
        expect(result.dm).toBeNull();
        expect(result.os).toBeNull();
        expect(result.osv).toBeNull();
        expect(result.p).toBeNull();
        expect(result.web_host).toBeNull();
    });
});