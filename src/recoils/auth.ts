import { atom } from "recoil";

export type LoginUser = {
  email: string;
  token: string;
};

const authState = atom({
  key: "authState",
  default: {} as LoginUser,
});

export const authSelector = {
  key: "authState",
};

export default authState;
