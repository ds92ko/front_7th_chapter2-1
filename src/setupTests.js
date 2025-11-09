import { server } from '@/__tests__/mockServerHandler';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { afterAll, beforeAll } from 'vitest';

configure({
  asyncUtilTimeout: 5000,
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});
