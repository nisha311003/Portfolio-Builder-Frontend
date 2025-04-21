import { createSlice } from "@reduxjs/toolkit";

export const previewReducerSlice = createSlice({
    name: "previewReducer",
    initialState: {
        userName: '',
    },
    reducers: {
        saveUserName(state, action) {
            console.log(action.payload);
            state.userName = action.payload;
          },

    }
});

export const {
    saveUserName,

} = previewReducerSlice.actions;
export default previewReducerSlice.reducer;