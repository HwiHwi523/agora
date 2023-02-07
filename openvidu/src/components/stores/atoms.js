import { atom } from "recoil";

export const roleState = atom({
  key: 'roleState',
  default: undefined,
})

export const isReadyState = atom({
  key: 'isReadyState',
  default: false,
})

export const isAllReadyState = atom({
  key: 'isAllReadyState',
  default: false,
})

export const isStartState = atom({
  key: 'isStartState',
  default: false,
})

export const CardNumState = atom({
  key: 'cardNumState',
  default: 0,
})