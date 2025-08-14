export type TryTaskResultType<T> =
  | { success: true; data: T }
  | { success: false; data: null };
