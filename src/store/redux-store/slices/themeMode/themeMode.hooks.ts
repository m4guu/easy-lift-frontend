import { useSelector } from "react-redux";
import { themeModeSelectors } from "./themeMode.selectors";

export const useIsDarkMode = () =>
  useSelector(themeModeSelectors.isDarkModeSelector);
