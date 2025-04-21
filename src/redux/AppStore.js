import {configureStore} from "@reduxjs/toolkit";
import appUIStateReducer from "./AppUIStateReducer";
import previewStateReducer from "./previewStateReducer";
import authReducer from "./authSlice";
export const appStore = configureStore({
    reducer: {
        appUIState: appUIStateReducer,
        previewReducer: previewStateReducer,
        auth : authReducer,
    }

})
