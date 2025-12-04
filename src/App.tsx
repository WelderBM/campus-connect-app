import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { InstitutionalHubPage } from "./features/home/pages/index.tsx";
import { FeedPage } from "./features/feed";
import { ChatHubPage } from "./features/chat";
import { GovernancePage } from "./features/governance/pages/index.tsx";
import { ProfilePage } from "./features/profile";
import { RankingPage } from "./features/ranquing";
import { HudPage } from "./features/geo-hub/pages/index.tsx";
import { MapHandler } from "./features/geo-hub/pages/mapHandler/index.tsx";
import { ProposalFormPage } from "./features/governance/pages/ProposalFormPage";

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
          <Route path="/" element={<InstitutionalHubPage />} />

          <Route path="/feed" element={<FeedPage />} />

          <Route path="/map" element={<MapHandler />} />
          <Route path="/hud/:hudId" element={<HudPage />} />

          <Route path="/chat" element={<ChatHubPage />} />
          <Route path="/chat/:groupId" element={<ChatHubPage />} />

          <Route path="/governance" element={<GovernancePage />} />
          <Route path="/governance/propose" element={<ProposalFormPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ranking" element={<RankingPage />} />

          <Route
            path="/university/:uniId"
            element={<UniversityPlaceholder />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
