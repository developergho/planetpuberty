// @flow
import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

export const GAME_MODE = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
};

type State = {
  gameMode: GAME_MODE,
  firstRound: any[],
  secondRound: any[],
  currentRound: number,
};

export const initialState: State = {
  gameMode: GAME_MODE.SINGLE,
  firstRound: [],
  secondRound: [],
  currentRound: 1,
};

const identifyFeelingSlice = createSlice({
  name: "IdentifyFeelingGamePlay",
  initialState,
  reducers: {
    setCurrentRound(state, action) {
      return {
        ...state,
        currentRound: action.payload,
      };
    },
    updateGameData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateFeelingData(state, action) {
      const newState = cloneDeep(state);
      const { firstRound, secondRound, currentRound } = newState;
      const { image, label, isDelete } = action.payload;
      const update = (roundData) => {
        const feelingData = roundData.find(
          (item) =>
            item.label_feeling.trim().toLowerCase() ===
            label.trim().toLowerCase()
        );

        if (feelingData) {
          if (isDelete) {
            feelingData.image = feelingData.image_feeling?.url;
            feelingData.isCustomAvatar = false;
          } else {
            feelingData.image = image;
            feelingData.isCustomAvatar = true;
          }
        }
      };

      if (currentRound === 1) {
        update(firstRound);
      } else {
        update(secondRound);
      }

      return newState;
    },
    setRoundData(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    resetGamePlay(state) {
      return {
        ...state,
        firstRound: state.firstRound.map((item) => {
          return {
            ...item,
            image: item.image_feeling?.url,
            isCustomAvatar: false,
          };
        }),
        secondRound: state.secondRound.map((item) => {
          return {
            ...item,
            image: item.image_feeling?.url,
            isCustomAvatar: false,
          };
        }),
      };
    },
  },
});

export const {
  setRoundData,
  setCurrentRound,
  updateGameData,
  updateFeelingData,
  resetGamePlay,
} = identifyFeelingSlice.actions;
export default identifyFeelingSlice.reducer;
