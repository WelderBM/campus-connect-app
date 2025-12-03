import React from "react";
import { CardContainer } from "@/global/components/CardContainer";

interface RankingCardProps {
  title: string;
  value: string;
  icon: string;
  isLoading: boolean;
}

export const RankingCard: React.FC<RankingCardProps> = ({
  title,
  value,
  icon,
  isLoading,
}) => {
  return (
    <CardContainer padding="large">
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500 font-semibold">{title}</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
            {isLoading ? (
              <span className="bg-gray-200 h-8 w-24 block rounded animate-pulse"></span>
            ) : (
              value
            )}
          </h3>
        </div>
      </div>
    </CardContainer>
  );
};
