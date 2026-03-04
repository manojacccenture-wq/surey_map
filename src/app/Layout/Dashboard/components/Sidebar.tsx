import { SIDEBAR_ICONS } from "@/app/config/Dashboard/sidebarIcons/SidebarIcons";
import { hasPermission } from "@/utils/permissionUtils/permissionUtils";
import { menuConfig } from "@/app/config/Dashboard/menuConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hook";


export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);


  const filteredMenu = menuConfig.filter((item) =>
    hasPermission(user?.Role, item.permission)
);


  return (
    <aside className="w-[250px] border-r border-gray-100 p-2">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-[#00BFA6] font-bold text-lg">Survey Management</h1>
      </div>

      <div className="space-y-2">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition
              ${location.pathname === item.path
                ? "bg-[#00BFA6]/10 text-[#00BFA6]"
                : "text-gray-700 hover:bg-[#00BFA6]/10 hover:text-[#00BFA6]"
              }`}
          >
            <img
                    src={SIDEBAR_ICONS[item.id as keyof typeof SIDEBAR_ICONS]}
              // src={SIDEBAR_ICONS[item.id]}
              alt={item.label}
              className="w-5 h-5 object-contain"
            />

            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
