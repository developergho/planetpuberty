import { combineReducers } from "redux";
import sampleReducer from "./sample.slice";
import playerReducer from "./player.slice";
import orbitPersonalizedCategoriesReducer from "./orbitPersonalizedCategories.slice";
import orbitGamePlayReducer from "./orbitGamePlay.slice";
import identifyFeelingGamePlayReducer from "./identifyFeeling.slice";

export const rootReducer = combineReducers({
  sample: sampleReducer,
  player: playerReducer,
  personalized: orbitPersonalizedCategoriesReducer,
  orbitGamePlay: orbitGamePlayReducer,
  identifyFeelingGamePlay: identifyFeelingGamePlayReducer,
});
