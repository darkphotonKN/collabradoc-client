// --- Document Editor Types ---

export type User = {
  id: string;
  name: string;
};

export const Privacy = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;
export type Privacy = (typeof Privacy)[keyof typeof Privacy];
