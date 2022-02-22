export function assert(value: unknown, message?: string): asserts value {
  if (typeof value === "boolean" && value === false) {
    throw new Error(message);
  }
}
