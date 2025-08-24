import { NavLink } from "react-router-dom";
import { Earth, Target, Calculator, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navItems = [
    { path: "/", icon: Earth, label: "Earth", id: "earth" },
    { path: "/challenges", icon: Target, label: "Challenges", id: "challenges" },
    { path: "/calculator", icon: Calculator, label: "Calculator", id: "calculator" },
    { path: "/badges", icon: Trophy, label: "Badges", id: "badges" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map(({ path, icon: Icon, label, id }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 text-xs font-medium transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;