import SIZE from "../constants/numbers";

const calcRem = (size) => `${size / SIZE.TEXT.DIVIDE_OCTUPLE}rem`;

const gaps = {
  small: calcRem(SIZE.GAP.SMALL),
  medium: calcRem(SIZE.GAP.MEDIUM),
  large: calcRem(SIZE.GAP.LARGE),
  xLarge: calcRem(SIZE.GAP.X_LARGE),
};

const fontSizes = {
  xSmall: calcRem(SIZE.TEXT.X_SMALL),
  small: calcRem(SIZE.TEXT.SMALL),
  medium: calcRem(SIZE.TEXT.MEDIUM),
  large: calcRem(SIZE.TEXT.LARGE),
  xLarge: calcRem(SIZE.TEXT.X_LARGE),
  graph: SIZE.TEXT.SMALL,
};

const colors = {
  PURPLE: "#990FBF",
  YELLOW: "#FFE600",
  BLACK: "#000000",
  WHITE: "#FFFFFF",
};

const theme = {
  gaps,
  fontSizes,
  colors,
};

export default theme;
