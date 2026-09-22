import { createSlice } from "@reduxjs/toolkit";

export const ORBIT_GAME_MODE = {
  CUSTOM_PERSONALIZE: "CUSTOM_PERSONALIZE",
  QUICK_GAME: "QUICK_GAME",
};

export const initialState = {
  defaultAvatars: [],
  currentRound: 1,
  firstRound: [],
  secondRound: [],
  gamePlayInfo: null,
  memberAdded: [],
  gameMode: null,
};

const orbitGamePlaySlice = createSlice({
  name: "OrbitGamePlay",
  initialState,
  reducers: {
    setDefaultAvatar(state, action) {
      state.defaultAvatars = action.payload;
      return state;
    },
    setGamePlayInfo(state, action) {
      state.gamePlayInfo = action.payload;
      return state;
    },
    updateGameData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentRound(state, action) {
      return {
        ...state,
        currentRound: action.payload,
        memberAdded: [],
      };
    },
    addDraggedMember(state, action) {
      return {
        ...state,
        memberAdded: [...state.memberAdded, action.payload.member],
      };
    },
  },
});

export const {
  setDefaultAvatar,
  setCurrentRound,
  updateGameData,
  setGamePlayInfo,
  addDraggedMember,
} = orbitGamePlaySlice.actions;
export default orbitGamePlaySlice.reducer;
