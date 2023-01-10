const THEME_BACKGROUND = {
  light: "#FFFFFF",
  dark: "#1A1C1E",
  layoutLight: "#ffffff",
  layoutDark: "#2F3338",
};

const GREY = {
  main: "#c4D4D4D",
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  grey: GREY,
};

const pallette = {
  light: {
    ...COMMON,
    background: {
      default: THEME_BACKGROUND.light,
      layout: THEME_BACKGROUND.layoutLight,
    },
    others: {
      border_color: "#E7EBF0",
      activeNavItem: "#F0F7FF",
    },
    action: { hover: "#F0F7FF" },
  },
  dark: {
    ...COMMON,
    primary: { main: "#FBC53B" },
    background: {
      default: THEME_BACKGROUND.dark,
      layout: THEME_BACKGROUND.layoutDark,
    },
    others: {
      border_color: "#1A1C1E33",
      activeNavItem: "#3F444E",
    },
    action: { hover: "#ffffff33" },
  },
};

export default pallette;
