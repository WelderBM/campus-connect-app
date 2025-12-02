import React from "react";
import { useAppContext } from "@/context/AppContext";
import { AdventurerLanding } from "./AdventurerLanding";
import { StudentHub } from "./StudentHub";

export const InstitutionalHubPage: React.FC = () => {
  const { currentUser } = useAppContext();

  if (currentUser?.role === "ADVENTURER") {
    return <AdventurerLanding />;
  }

  return <StudentHub />;
};
