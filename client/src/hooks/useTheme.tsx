import { useContext } from "react";
import { ThemeButton } from "../context/Theme";
export const useThemeButton = () => {
    const context = useContext(ThemeButton);
    if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  };
  