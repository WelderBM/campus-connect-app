import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AppProvider } from "./context/AppContext";

import { InstitutionalHubPage } from "./features/home/pages";
import { FeedPage } from "./features/feed";
import { ChatHubPage } from "./features/chat";
import { GroupChatPage } from "./features/chat/components/GroupChatPage";
import { GovernancePage } from "./features/governance/pages";
import { ProposalFormPage } from "./features/governance/pages/ProposalFormPage";
import { MapHandler } from "./features/geo-hub/pages/mapHandler";
import { RankingPage } from "./features/ranquing";
import { ProfilePage } from "./features/profile";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<InstitutionalHubPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/chat" element={<ChatHubPage />} />
            <Route path="/chat/:groupId" element={<GroupChatPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/governance/new" element={<ProposalFormPage />} />
            <Route path="/map" element={<MapHandler />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/hud/:hudId" element={<FeedPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
};
