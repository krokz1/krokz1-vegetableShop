/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}