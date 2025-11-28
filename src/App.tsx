import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { FeedPage } from "@/features/feed/pages/FeedPage";
import { GeoHubPage } from "@/features/geo-hub/pages/GeoHubPage";
import { HudPage } from "@/features/geo-hub/pages/HudPage";
import { GovernancePage } from "@/features/governance/GovernancePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ChatHubPage } from "@/features/chat/pages";

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
          <Route
            path="/chat/:groupId"
            element={
              <div className="p-10">Interface de Chat específica...</div>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
