import { atom } from "recoil";

export type LoginUser = {
  email: string;
  token: string;
};

const authState = atom({
  key: "authState",
  default: {} as LoginUser,
  effects: [
    ({ setSelf, onSet }: any) => {
      const savedUser = localStorage.getItem("user");
      savedUser !== null && setSelf(JSON.parse(savedUser));

      onSet((user: LoginUser) => {
        user.token !== ""
          ? localStorage.setItem("user", JSON.stringify(user))
          : localStorage.removeItem("user");
      });
    },
  ],
});

export default authState;
