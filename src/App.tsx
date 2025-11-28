import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { FeedPage } from "./features/feed";
import { GeoHubPage } from "./features/geo-hub/GeoHubPage";
import { HudPage } from "./features/geo-hub";
import { GovernancePage } from "./features/governance";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { ChatHubPage } from "./features/chat/pages/GroupChatPage";
import { GroupChatPage } from "./features/chat/pages";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/map" element={<GeoHubPage />} />
          <Route path="/hud/:hudId" element={<HudPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatHubPage />} />
          <Route path="/chat/:groupId" element={<GroupChatPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
