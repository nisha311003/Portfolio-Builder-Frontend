import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../Login/LoginForm';
import MainPanel from '../MainPanel/MainPanel';
import CreateYourProfile from '../MainPanel/CreateYourProfile';
import PreviewPage from '../MainPanel/PreviewPage';
import ExplorePortfolios from '../MainPanel/ExplorePortfolios';
import SigningUp from '../Login/SigningUp';
function RedirectLogicPage(props) {
  const uiState = useSelector(state => state.appUIState.loginPanel);
  return (
    <div>
      {uiState.zoneLoginPanelVisible && <LoginForm onLogin={props.onLogin} />}
      {uiState.zoneSignUpPanelVisible && <SigningUp />}
      {uiState.zoneMainPanelVisible && <MainPanel />}
      {uiState.zoneCreatePageVisible && <CreateYourProfile />}
      {uiState.zonePreviewPageVisible && <PreviewPage />}
      {uiState.zoneExplorePageVisible && <ExplorePortfolios />}
    </div>
  );
}

export default RedirectLogicPage;
