import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { FeedPage } from "@/features/feed/pages/FeedPage";
import { GeoHubPage } from "@/features/geo-hub/pages/GeoHubPage";
import { HudPage } from "@/features/geo-hub/pages/HudPage";
import { GovernancePage } from "./features/governance/GovernancePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";

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
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
