export const ActionType = {
  JOIN: 0x12,
  LEAVE: 0x13,
  EDITOR_LIST: 0x14,
  EDIT: 0x15,
  SYSTEM_MESSAGE: 0x16,
} as const;
export type ActionTypeEnum = (typeof ActionType)[keyof typeof ActionType];
