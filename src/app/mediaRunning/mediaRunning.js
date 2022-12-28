import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";



const initialState = {};

export const mediaRunningSlice = createSlice({
  name: "mediaRunning",
  initialState,
  reducers: {
    changeCurrentMediaRunning: (
      state,
      action
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeStateMediaRunning: (
      state,
      action,
    ) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    removeMediaRunning: (state) => {
      return {
        listIdAudio: state.listIdAudio,
      };
    },
    //
    addNewIdListAudio: (state, action)=> {
      return {
        ...state,
        listIdAudio: [...(state.listIdAudio || []), action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeCurrentMediaRunning,
  changeStateMediaRunning,
  removeMediaRunning,
  addNewIdListAudio,
} = mediaRunningSlice.actions;

export const selectCurrentMediaRunning = (state) =>
  state.mediaRunning;

export default mediaRunningSlice.reducer;
