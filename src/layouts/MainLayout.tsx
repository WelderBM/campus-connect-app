import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { ActionButton } from "@/global/components/ActionButton";
import { CardContainer } from "@/global/components/cardContainer";

const NavigationButton: React.FC<{
  to: string;
  label: string;
  icon: string;
  currentPath: string;
}> = ({ to, label, icon, currentPath }) => {
  const isActive =
    currentPath === to || (to === "/chat" && currentPath.startsWith("/chat/"));
  return (
    <ActionButton
      onClick={() => window.location.assign(to)}
      text={label}
      emoji={icon}
      variant={isActive ? "primary" : "secondary"}
      className={`justify-start text-left text-sm py-3 px-4 ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-gray-100 text-gray-700"
      }`}
      isFullWidth={true}
    />
  );
};

export const MainLayout: React.FC = () => {
  const {
    currentUser,
    isAuthReady,
    locationStatus,
    currentHubId,
    universityData,
  } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPath = location.pathname;

  const currentHub = currentHubId
    ? (universityData?.huds || []).find((h) => h.id === currentHubId)
    : null;

  const showSidebar = isAuthReady && currentUser?.role === "STUDENT";

  if (!isAuthReady) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-bold text-gray-500">
          Aguardando Autenticação...
        </div>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && (
        <>
          <aside
            className={`fixed inset-y-0 left-0 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white border-r border-gray-200 p-4 z-50 shadow-xl lg:shadow-none`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-blue-700">
                Campus Connect
              </h2>
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <CardContainer padding="default" className="mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 truncate">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">
                    {currentUser?.points} XP
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ID: {currentUser?.id}
              </p>
            </CardContainer>

            <nav className="space-y-2">
              <NavigationButton
                to="/"
                label="Hub Institucional"
                icon="🏠"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/feed"
                label="Feed"
                icon="💬"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/map"
                label="Mapa Geo-Hub"
                icon="🗺️"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/chat"
                label="Mensagens"
                icon="✉️"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/governance"
                label="Governança DAO"
                icon="🏛️"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/ranking"
                label="Ranking"
                icon="🏆"
                currentPath={currentPath}
              />
              <NavigationButton
                to="/profile"
                label="Meu Perfil"
                icon="👤"
                currentPath={currentPath}
              />
            </nav>

            <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-100 rounded-xl">
              <p className="text-xs font-bold text-gray-700">
                Status de Presença:
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  locationStatus === "PRESENCIAL"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {locationStatus === "PRESENCIAL"
                  ? "PRESENCIAL"
                  : "FORA DO CAMPUS"}
              </p>
              {currentHub && (
                <p className="text-xs text-gray-500 mt-1 truncate">
                  Hub Ativo: {currentHub.nickname}
                </p>
              )}
            </div>
          </aside>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </>
      )}

      <main className="flex-1 overflow-x-hidden p-0">
        <header className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-sm z-30 lg:hidden flex justify-between items-center">
          {showSidebar && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-900">
            {universityData?.shortName || "GeoHub"}
          </h1>
        </header>
        <div className="p-4 lg:p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
