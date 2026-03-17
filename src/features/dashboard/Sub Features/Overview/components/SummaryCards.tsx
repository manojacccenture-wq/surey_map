import React from "react";
import Card from "@/shared/components/UI/Card/Card";

type SummaryItem = {
  name: string;
  count: number;
};

type SummaryCardType = {
  label: string;
  value?: string | number;
  valueColor?: string;
  iconBg?: string;
  icon?: React.ElementType | string;
  items?: SummaryItem[];
};

interface SummaryCardsProps {
  cards?: SummaryCardType[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ cards = [] }) => {
  if (!cards.length) return null;

  const topCards = cards.slice(0, 3);
  const bottomCards = cards.slice(3);

  const renderCardContent = (card: SummaryCardType) => (
    <div className="flex flex-col gap-1 h-full">

      {/* 🔥 UPDATED ROW (ICON + LABEL + VALUE) */}
      <div className="flex items-center justify-between gap-2">

        {/* Left side (Icon + Label) */}
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: card.iconBg || "#EEF2FF" }}
          >
            {card.icon &&
              (typeof card.icon === "function" ? (
                React.createElement(card.icon, {
                  className: "w-6 h-6 text-white",
                })
              ) : (
                <img
                  src={card.icon}
                  alt={card.label}
                  className="w-8 h-8 object-contain"
                />
              ))}
          </div>

         <p className="text-sm font-medium text-gray-600 leading-none">
            {card.label}
          </p>
        </div>

        {/* Right side (Value) */}
        {card.value !== undefined && (
          <p className="text-lg font-bold text-gray-900">
            {card.value}
          </p>
        )}
      </div>

      {/* Items list (unchanged) */}
      {card.items && (
        <div className="flex-1 overflow-y-auto pr-2 max-h-40 space-y-2 text-sm text-gray-700">
          {card.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-100 pb-1"
            >
              <span className="truncate">{item.name}</span>
              <span className="font-semibold">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topCards.map((card, index) => (
          <Card
            key={index}
            className="flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md w-full"
            padding="p-8"
            rounded="rounded-2xl"
          >
            {renderCardContent(card)}
          </Card>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bottomCards.map((card, index) => (
          <Card
            key={index}
            className="flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md w-full"
            padding="p-4"
            rounded="rounded-2xl"
          >
            {renderCardContent(card)}
          </Card>
        ))}
      </div>

    </div>
  );
};

export default SummaryCards;