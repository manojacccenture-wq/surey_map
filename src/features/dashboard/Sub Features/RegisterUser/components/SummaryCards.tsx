import Card from "@/shared/components/UI/Card/Card";

interface SummaryCard {
  label: string;
  value?: string | number;
  valueColor?: string;
  iconBg?: string;
  icon?: string | React.ElementType;
}

interface Props {
  cards?: SummaryCard[];
}

const SummaryCards: React.FC<Props> = ({ cards = [] }) => {
  if (!cards.length) return null;

  return (
    <div className="flex gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="flex-1 min-w-0">
          <div className="flex flex-col gap-3 w-full">

            {/* Icon */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.iconBg }}
            >
              {card.icon &&
                (typeof card.icon === "function" ? (
                  <card.icon className="w-6 h-6 text-white" />
                ) : (
                  <img
                    src={card.icon}
                    alt={card.label}
                    className="w-6 h-6 object-contain"
                  />
                ))}
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-normal leading-4 text-[var(--color-text-paragraph)]">
                {card.label}
              </p>

              {card.value && (
                <p
                  className="text-lg font-semibold leading-6"
                  style={{ color: card.valueColor }}
                >
                  {card.value}
                </p>
              )}
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;