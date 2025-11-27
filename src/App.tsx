import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { FeedPage } from "@/features/feed/pages/FeedPage";
import { GeoHubPage } from "@/features/geo-hub/pages";

const GovernancePlaceholder = () => (
  <div className="p-10 text-center text-xl text-gray-500">
    🏛️ Hub de Governança em construção...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/map" element={<GeoHubPage />} />
          <Route path="/governance" element={<GovernancePlaceholder />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
