export function isPrimitive(value: unknown): boolean {
  return (
    (typeof value !== 'object' && typeof value !== 'function') || value === null
  );
}

// export const isPlainObject = (val: unknown) =>
//   !!val && typeof val === "object" && val.constructor === Object;

export const isPlainObject = (val: unknown) =>
  typeof val === 'object' && val !== null && !Array.isArray(val);
