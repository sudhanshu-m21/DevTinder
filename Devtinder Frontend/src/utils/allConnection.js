import { createSlice } from "@reduxjs/toolkit";

const allConnectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection: (state, actions) => {
      return actions.payload;
    },
  },
});
export const { addConnection } = allConnectionSlice.actions;
export default allConnectionSlice.reducer;
