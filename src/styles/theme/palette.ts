const THEME_BACKGROUND = {
  light: "#f7f7f7",
  dark: "#1A1C1E",
  layoutLight: "#ffffff",
  layoutDark: "#2F3338",
};

const GREY = {
  main: "#c4D4D4D",
  tint_1: "#767676",
  tint_2: "#595959",
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  custom_grey: GREY,
};

const pallette = {
  light: {
    ...COMMON,
    primary: { main: "#FC9E4F" },
    background: {
      default: THEME_BACKGROUND.light,
      layout: THEME_BACKGROUND.layoutLight,
    },
    others: {
      border_color: "rgba(0, 0, 0, 0.12)",
      activeNavItem: "#F0F7FF",
    },
    action: { hover: "#F0F7FF" },
  },

  dark: {
    ...COMMON,
    primary: { main: "#D3A634" },
    info: { main: "#477998" },
    error: { main: "#95190C" },
    success: { main: "#9AE19D" },
    background: {
      default: THEME_BACKGROUND.dark,
      layout: THEME_BACKGROUND.layoutDark,
    },
    others: {
      border_color: "rgba(255, 255, 255, 0.12)",
      activeNavItem: "#3F444E",
    },
    action: { hover: "#ffffff33" },
  },
};

export default pallette;
