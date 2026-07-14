/**
 * Resolve an env value from runtime injection (AWS/container) first,
 * then fall back to Create React App build-time process.env (local .env).
 */
export function getEnv(key) {
  const injected = typeof window !== 'undefined' && window.injectedEnv
    ? window.injectedEnv[key]
    : undefined;

  if (
    typeof injected === 'string'
    && injected.length > 0
    && !injected.includes('${')
  ) {
    return injected;
  }

  return process.env[key];
}

export default getEnv;
