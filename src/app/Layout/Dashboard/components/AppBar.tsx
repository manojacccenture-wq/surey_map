import { useLocation } from "react-router-dom";
import { ROUTE_TITLES } from "@/app/config/Dashboard/routeTitles";

export default function AppBar() {
  const location = useLocation();

  const title =
    ROUTE_TITLES[location.pathname] || "Dashboard";

  return (
    <div className="border-b flex items-center p-3 justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-medium text-gray-800">
          {title}
        </h2>
      </div>

      <div>
        {/* profile icon */}
      </div>
    </div>
  );
}