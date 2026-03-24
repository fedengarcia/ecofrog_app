import { TFunction } from "i18next";
import i18n from "../index";
import { TextPart } from "../../types/products";

export function getEcofrogPage2Data(t: TFunction) {
  const isSpanish = i18n.language === "es";
  const titleArr = t("ecofrog:page2.title", {
    returnObjects: true,
  }) as string[];
  const descArr = t("ecofrog:page2.description", {
    returnObjects: true,
  }) as string[];
  const col1TitleArr = t("ecofrog:page2.column1.title", {
    returnObjects: true,
  }) as string[];
  const col1DescArr = t("ecofrog:page2.column1.description", {
    returnObjects: true,
  }) as string[];
  const col2DescArr = t("ecofrog:page2.column2.description", {
    returnObjects: true,
  }) as string[];

  return {
    title: [
      { text: titleArr[0], bold: true },
      { text: titleArr[1], highlight: true, bold: true },
    ] as TextPart[],
    description: [
      { text: descArr[0], light: true },
      { text: descArr[1], highlight: true, bold: true },
      { text: descArr[2], bold: true },
      { text: descArr[3], light: true },
      { text: descArr[4], bold: true },
      { text: descArr[5], light: true },
      { text: descArr[6], bold: true },
    ] as TextPart[],
    column1: {
      title: [
        { text: col1TitleArr[0], bold: true },
        { text: col1TitleArr[1], highlight: true, bold: true },
        { text: col1TitleArr[2], bold: true },
      ] as TextPart[],
      description: [
        { text: col1DescArr[0], highlight: true, bold: true },
        { text: col1DescArr[1], light: true },
        { text: col1DescArr[2], highlight: true, bold: true },
        { text: col1DescArr[3], light: true },
        { text: col1DescArr[4], highlight: true, bold: true },
        { text: col1DescArr[5], light: true },
      ] as TextPart[],
      video: require("../../assets/products/modalEcofrog/ozono_video_es.mp4"),
    },
    column2: {
      description: [
        { text: col2DescArr[0], highlight: true, bold: true },
        { text: col2DescArr[1], regular: true },
        { text: col2DescArr[2], bold: true },
        { text: col2DescArr[3], regular: true },
        { text: col2DescArr[4], bold: true },
      ] as TextPart[],
      image: isSpanish
        ? require("../../assets/products/modalEcofrog/advisorsCircle_es.png")
        : require("../../assets/products/modalEcofrog/advisorsCircle.png"),
    },
    certifications: t("ecofrog:page2.certifications"),
  };
}
