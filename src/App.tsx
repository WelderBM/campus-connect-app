import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { FeedPage } from "./features/feed";
import { GlobalViewPage } from "./features/global";
import { HudPage } from "./features/geo-hub";
import { GroupChatPage } from "./features/chat";
import { GovernancePage } from "./features/governance";
import { ProfilePage } from "./features/profile";
import { ChatHubPage } from "./features/chat/components/GroupChatPage";
import { RankingPage } from "./features/ranquing";

function App() {
  const UniversityPlaceholder = () => (
    <div className="p-10 text-center text-xl text-gray-500">
      🏢 Página de Universidade Nacional (UFPA, etc.) em construção...
    </div>
  );
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/map" element={<GlobalViewPage />} />
          <Route path="/hud/:hudId" element={<HudPage />} />
          <Route path="/chat/:groupId" element={<GroupChatPage />} />
          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/chat" element={<ChatHubPage />} />
          <Route
            path="/university/:uniId"
            element={<UniversityPlaceholder />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
