
export const generateId = <T extends string>(): T => {
  return crypto.randomUUID().slice(0, 10) as T;
};