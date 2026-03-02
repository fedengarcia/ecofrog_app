import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Base dimensions matching the Xiaomi Redmi Pad 2 (target device)
const guidelineBaseWidth = 800;
const guidelineBaseHeight = 1280;

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;

export const verticalScale = (size: number): number =>
  (longDimension / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;

export const moderateVerticalScale = (
  size: number,
  factor: number = 0.5
): number => size + (verticalScale(size) - size) * factor;
