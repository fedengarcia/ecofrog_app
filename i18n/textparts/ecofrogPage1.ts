import { TFunction } from "i18next";
import { TextPart } from "../../types/products";

export function getEcofrogPage1Data(t: TFunction) {
  return {
    titlePrefix: t("ecofrog:page1.titlePrefix"),
    titleO: t("ecofrog:page1.titleO"),
    titleSubscript: t("ecofrog:page1.titleSubscript"),
    titleSuffix: t("ecofrog:page1.titleSuffix"),
    subtitle: [
      { text: (t("ecofrog:page1.subtitle", { returnObjects: true }) as string[])[0] },
      {
        text: (t("ecofrog:page1.subtitle", { returnObjects: true }) as string[])[1],
        highlight: true,
        bold: true,
      },
    ] as TextPart[],
    description: [
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[0], highlight: true, bold: true },
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[1] },
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[2], bold: true },
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[3] },
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[4], bold: true, highlight: true },
      { text: (t("ecofrog:page1.description", { returnObjects: true }) as string[])[5] },
    ] as TextPart[],
    items: (t("ecofrog:page1.items", { returnObjects: true }) as { title: string; description: string[] }[]).map(
      (item, idx) => ({
        icon: [
          require("../../assets/products/modalEcofrog/clockSand.png"),
          require("../../assets/products/modalEcofrog/world.png"),
          require("../../assets/products/modalEcofrog/users.png"),
        ][idx],
        title: item.title,
        description: idx === 0
          ? [
              { text: item.description[0], highlight: true, bold: true },
              { text: item.description[1] },
              { text: item.description[2], bold: true },
              { text: item.description[3] },
            ] as TextPart[]
          : [{ text: item.description[0] }] as TextPart[],
      })
    ),
  };
}
