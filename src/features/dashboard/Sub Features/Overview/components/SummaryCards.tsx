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

  return (
    <div className="flex gap-6 w-full">
      {cards.map((card, index) => {
        return <Card
          key={index}
          className="flex-1 min-w-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          padding="p-5"
          rounded="rounded-2xl"
        >
          <div className="flex flex-col gap-4 h-full">

            {/* Icon + Label */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: card.iconBg || "#EEF2FF" }}
              >
                {card.icon &&
                  (typeof card.icon === "function" ? (
                    React.createElement(card.icon, {
                      className: "w-5 h-5 text-white",
                    })
                  ) : (
                    <img
                      src={card.icon}
                      alt={card.label}
                      className="w-5 h-5 object-contain"
                    />
                  ))}
              </div>

              
             
                <p className="text-sm font-medium text-gray-500">
                  {card.label}
                </p>
              
            </div>
            <p className="text-2xl font-bold tracking-tight text-left" >{card.value}</p>
            {/* Main Value */}
            {/* {card.value !== undefined && (
              <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: card.valueColor || "#111827" }}
              >
                {card.value}

              </p>
            )} */}

            {/* Scrollable Items Section */}
            {card.items && (
              <div className="flex-1 overflow-y-auto pr-2 max-h-40 space-y-2 text-sm text-gray-700 scrollbar-thin scrollbar-thumb-gray-300">
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
        </Card>
      })}
    </div>
  );
};

export default SummaryCards;