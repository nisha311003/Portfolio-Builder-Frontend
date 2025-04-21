import { createSlice } from "@reduxjs/toolkit";

export const appUIStateSlice = createSlice({
    name: "appUIState",
    initialState: {
          loginPanel:{
              zoneLoginPanelVisible: true,
              zoneMainPanelVisible:false,
              zoneCreatePageVisible:false,
              zonePreviewPageVisible:false,
              zoneExplorePageVisible: false,
              zoneSignUpPanelVisible: false,

          }

    },
    reducers: {
        enableZoneLoginPanel: (state, action) => {
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneCreatePageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=true;
            state.loginPanel.zonePreviewPageVisible=false;
            state.loginPanel.zoneExplorePageVisible=false;
            state.loginPanel.zoneSignUpPanelVisible=false;
        },

        enableZoneMainPanel: (state, action) => {
            state.loginPanel.zoneMainPanelVisible = true;
            state.loginPanel.zoneCreatePageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=false;
            state.loginPanel.zonePreviewPageVisible=false;
            state.loginPanel.zoneExplorePageVisible=false;
        },

        enableZoneCreatePage: (state, action) => {
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneCreatePageVisible = true;
            state.loginPanel.zoneLoginPanelVisible=false;
            state.loginPanel.zonePreviewPageVisible=false;
            state.loginPanel.zoneExplorePageVisible=false;
        },
        enableZonePreviewPage: (state, action) => {
            console.log('hii from reducer')
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneCreatePageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=false;
            state.loginPanel.zonePreviewPageVisible=true;
            state.loginPanel.zoneExplorePageVisible=false;
        },
        enableZoneExplorePage: (state, action) => {
            console.log('hii from reducer')
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneCreatePageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=false;
            state.loginPanel.zonePreviewPageVisible=false;
            state.loginPanel.zoneExplorePageVisible=true;
        },
        enableZoneSignUpPage: (state, action) => {
            state.loginPanel.zoneSignUpPanelVisible=true;
            console.log(state.loginPanel.zoneSignUpPanelVisible)
            state.loginPanel.zoneMainPanelVisible = false;
            state.loginPanel.zoneCreatePageVisible = false;
            state.loginPanel.zoneLoginPanelVisible=false;
            state.loginPanel.zonePreviewPageVisible=false;
            state.loginPanel.zoneExplorePageVisible=false;
            
        },

    }
});

export const {

    enableZoneMainPanel,
    enableZoneCreatePage,
    enableZonePreviewPage,
    enableZoneExplorePage,
    enableZoneLoginPanel,
    enableZoneSignUpPage,

} = appUIStateSlice.actions;
export default appUIStateSlice.reducer;