import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentUser } = useAppContext();

  const universityName = "Universidade de São Paulo";
  const universityFlag = <span className="text-2xl mr-2">🇧🇷</span>;
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {universityFlag}
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">
              {universityName}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-700">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                    {currentUser.role === "STUDENT"
                      ? "Universitário"
                      : "Visitante"}
                  </p>
                </div>
                <img
                  src={currentUser.avatarUrl}
                  alt="Perfil"
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 rounded-full border-2 border-gray-100 cursor-pointer hover:border-blue-200 transition-colors"
                />
              </>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            )}
          </div>
        </div>
        <div className="h-16" />
      </header>
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-2 px-6 z-50">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link
            to="/feed"
            className={`flex flex-col items-center gap-1 ${
              isActive("/feed") ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Início</span>
          </Link>

          <Link
            to="/map"
            className={`flex flex-col items-center gap-1 ${
              isActive("/map") ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <span className="text-xl">🗺️</span>
            <span className="text-[10px] font-bold">Mapa</span>
          </Link>

          <Link
            to="/governance"
            className={`flex flex-col items-center gap-1 ${
              isActive("/governance") ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <span className="text-xl">🏛️</span>
            <span className="text-[10px] font-bold">Governança</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-4">{children}</main>
    </div>
  );
};
