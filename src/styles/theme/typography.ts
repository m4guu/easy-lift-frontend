function pxToRem(value: number) {
  return `${value / 10}rem`;
}

function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (min-width:320px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:480px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const typography = {
  fontFamily: "Roboto, sans-serif",
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  caption: {
    fontWeight: 700,
    lineHeight: "117%",
    textTransform: "uppercase",
    fontSize: pxToRem(26),
    letterSpacing: 0,
    ...responsiveFontSizes({ sm: 17, md: 17, lg: 26 }),
  },
  subtitle1: {
    fontWeight: 700,
    lineHeight: "117%",
    fontSize: pxToRem(13),
    letterSpacing: 0,
    ...responsiveFontSizes({ sm: 11, md: 11, lg: 13 }),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: "117%",
    fontSize: pxToRem(11),
    letterSpacing: 1,
    ...responsiveFontSizes({ sm: 10, md: 10, lg: 11 }),
  },
  h3: {
    fontWeight: 400,
    lineHeight: "117%",
    fontSize: pxToRem(10),
    letterSpacing: 0.5,
    ...responsiveFontSizes({ sm: 9, md: 9, lg: 10 }),
  },
} as const;

export default typography;
