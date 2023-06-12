const NOT_AVAILABLE = 'Unknown';

const addData = (
  defaultParams: Record<string, unknown>,
  userInput: Record<string, unknown>
): Record<string, unknown> => {
  userInput['lang'] = getLanguage();
  userInput['sr'] = getScreenResolution();
  userInput['url'] = typeof window !== 'undefined' ? window.location.href : null;
  userInput['r'] = typeof document !== 'undefined' ? document.referrer : null;

  // override/remove user input for the following fields.
  userInput['db'] = null;
  userInput['dm'] = null;
  userInput['os'] = null;
  userInput['osv'] = null;
  userInput['p'] = null;
  userInput['web_host'] = null;

  // user input should override default params
  return Object.assign(defaultParams, userInput);
};

const getLanguage = (): string | null => {
  if (typeof navigator !== 'undefined') {
    return navigator.language || NOT_AVAILABLE;
  }
  return null;
};

const getScreenResolution = (): string | null => {
  if (typeof screen !== 'undefined') {
    return `${screen.width}x${screen.height}`;
  }

  return null;
};

export { addData, getLanguage, getScreenResolution };
