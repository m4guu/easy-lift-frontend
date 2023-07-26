import "@testing-library/jest-dom";
import { afterEach } from "vitest";

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
