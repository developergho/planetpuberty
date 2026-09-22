// @flow
import { createSlice } from "@reduxjs/toolkit";

type State = {
  name?: string,
  avatar?: string,
  isCustomAvatar?: boolean,
  currentGamePlay: string,
};

export const GAMEPLAY = {
  IDENTITY_FEELING: "IDENTITY_FEELING",
  ORBIT: "ORBIT",
  PRIVATE_AND_PUBLIC: "PRIVATE_AND_PUBLIC",
};

export const initialState: State = {};

const playerSlice = createSlice({
  name: "Player",
  initialState,
  reducers: {
    setPlayerData(state, action) {
      state = {
        ...state,
        ...action.payload,
      };

      return state;
    },
  },
});

export const { setPlayerData } = playerSlice.actions;
export default playerSlice.reducer;
