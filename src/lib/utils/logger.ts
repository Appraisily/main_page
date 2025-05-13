const DEBUG_ENABLED = import.meta.env.VITE_CONSOLE_DEBUG_ENABLED === 'true';

/**
 * Custom logger utility that respects the VITE_CONSOLE_DEBUG_ENABLED environment variable.
 */
export const logger = {
  log: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.info(...args);
    }
  },
  debug: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.debug(...args);
    }
  },
}; 