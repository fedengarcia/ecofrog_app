import { TFunction } from "i18next";
import { Product, ProductId, TextPart, BubbleText } from "../../types/products";

function tp(texts: string[], styles: Partial<TextPart>[]): TextPart[] {
  return texts.map((text, i) => ({ text, ...styles[i] }));
}

export function getProducts(t: TFunction): Product[] {
  return [
    {
      id: ProductId.AVATAR,
      logo: require("../../assets/products/avatar/avatarLogo.png"),
      image: require("../../assets/products/avatar/avatarImage.png"),
      textParts: tp(t("products:avatar.textParts", { returnObjects: true }) as string[], [
        {},
        { highlight: true },
        {},
        { bold: true },
      ]),
      modalData: {
        imageModal: require("../../assets/products/avatar/avatarModal.png"),
        video: "https://www.ecofrog.es/wp-content/uploads/2026/02/avatar-ecofrog-app-video-modal.mp4",
        showBubbleMedium: true,
        title: tp(t("products:avatar.modal.title", { returnObjects: true }) as string[], [
          {},
          { highlight: true },
          {},
          { bold: true },
        ]),
        subtitle: tp(t("products:avatar.modal.subtitle", { returnObjects: true }) as string[], [
          {},
          { highlight: true, bold: true },
          {},
          { bold: true },
        ]),
        icons: [
          { legend: (t("products:avatar.modal.icons", { returnObjects: true }) as string[])[0], url: require("../../assets/products/avatar/disinfects.png") },
          { legend: (t("products:avatar.modal.icons", { returnObjects: true }) as string[])[1], url: require("../../assets/products/avatar/help.png") },
          { legend: (t("products:avatar.modal.icons", { returnObjects: true }) as string[])[2], url: require("../../assets/products/avatar/reduce.png") },
          { legend: (t("products:avatar.modal.icons", { returnObjects: true }) as string[])[3], url: require("../../assets/products/avatar/save.png") },
          { legend: (t("products:avatar.modal.icons", { returnObjects: true }) as string[])[4], url: require("../../assets/products/avatar/consume.png") },
        ],
        description_1: tp(t("products:avatar.modal.description1", { returnObjects: true }) as string[], [
          {},
          { highlight: true, bold: true },
          {},
          { highlight: true, bold: true },
          {},
          { bold: true },
          {},
        ]),
        description_2: tp(t("products:avatar.modal.description2", { returnObjects: true }) as string[], [
          {},
          { bold: true },
          { break: true },
          {},
          { bold: true },
        ]),
        bubbleText: {
          title: t("products:avatar.modal.bubbleTitle"),
          withoutDots: true,
          items: (t("products:avatar.modal.bubbleItems", { returnObjects: true }) as string[][]).map(
            (item, idx) =>
              tp(item, idx === 0
                ? [{}, { bold: true }, {}]
                : [{}, { bold: true }]
              )
          ),
        },
      },
    },
    {
      id: ProductId.WASH,
      logo: require("../../assets/products/wash/washLogo.png"),
      image: require("../../assets/products/wash/washImage.png"),
      textParts: tp(t("products:wash.textParts", { returnObjects: true }) as string[], [
        { bold: true },
        {},
        { highlight: true },
      ]),
      modalData: {
        imageModal: require("../../assets/products/wash/washModal.png"),
        video: "https://www.ecofrog.es/wp-content/uploads/2026/02/wash-ecofrog-app-video-modal.mp4",
        showBubbleMedium: true,
        title: tp(t("products:wash.modal.title", { returnObjects: true }) as string[], [
          { bold: true },
          {},
          { highlight: true },
        ]),
        subtitle: tp(t("products:wash.modal.subtitle", { returnObjects: true }) as string[], [
          { bold: true, highlight: true },
          {},
          { bold: true, highlight: true },
          {},
          { bold: true },
          {},
        ]),
        icons: [
          { legend: (t("products:wash.modal.icons", { returnObjects: true }) as string[])[0], url: require("../../assets/products/wash/profitable.png") },
          { legend: (t("products:wash.modal.icons", { returnObjects: true }) as string[])[1], url: require("../../assets/products/wash/convenient.png") },
          { legend: (t("products:wash.modal.icons", { returnObjects: true }) as string[])[2], url: require("../../assets/products/wash/healthy.png") },
          { legend: (t("products:wash.modal.icons", { returnObjects: true }) as string[])[3], url: require("../../assets/products/wash/sustainable.png") },
          { legend: (t("products:wash.modal.icons", { returnObjects: true }) as string[])[4], url: require("../../assets/products/wash/ecofriendly.png") },
        ],
        description_1: tp(t("products:wash.modal.description1", { returnObjects: true }) as string[], [
          {},
          { highlight: true, bold: true },
          {},
          { bold: true, highlight: true },
          {},
          { bold: true },
          {},
          { bold: true },
        ]),
        description_2: tp(t("products:wash.modal.description2", { returnObjects: true }) as string[], [
          {},
        ]),
        bubbleText: {
          title: t("products:wash.modal.bubbleTitle"),
          withoutDots: false,
          items: (t("products:wash.modal.bubbleItems", { returnObjects: true }) as string[][]).map(
            (item, idx) => {
              if (idx === 0) return tp(item, [{ bold: true }, {}]);
              if (idx === 1) return tp(item, [{ bold: true }, {}]);
              return tp(item, [{ bold: true }, {}, { bold: true, highlight: true }, {}]);
            }
          ),
        },
      },
    },
    {
      id: ProductId.TROLLEY,
      logo: require("../../assets/products/trolley/trolleyLogo.png"),
      image: require("../../assets/products/trolley/trolleyImage.png"),
      textParts: tp(t("products:trolley.textParts", { returnObjects: true }) as string[], [
        {},
        { bold: true },
        {},
        { highlight: true },
      ]),
      modalData: {
        imageModal: require("../../assets/products/trolley/trolleyModal.png"),
        video: "https://www.ecofrog.es/wp-content/uploads/2026/02/trolley-ecofrogg-app-video-modal.mp4",
        showBubbleMedium: true,
        title: tp(t("products:trolley.modal.title", { returnObjects: true }) as string[], [
          {},
          { bold: true },
          {},
          { highlight: true },
        ]),
        subtitle: tp(t("products:trolley.modal.subtitle", { returnObjects: true }) as string[], [
          {},
          { bold: true },
          {},
          { bold: true, highlight: true },
          {},
        ]),
        icons: [
          { legend: (t("products:trolley.modal.icons", { returnObjects: true }) as string[])[0], url: require("../../assets/products/trolley/useful.png") },
          { legend: (t("products:trolley.modal.icons", { returnObjects: true }) as string[])[1], url: require("../../assets/products/trolley/durable.png") },
          { legend: (t("products:trolley.modal.icons", { returnObjects: true }) as string[])[2], url: require("../../assets/products/trolley/efficient.png") },
          { legend: (t("products:trolley.modal.icons", { returnObjects: true }) as string[])[3], url: require("../../assets/products/trolley/versatile.png") },
          { legend: (t("products:trolley.modal.icons", { returnObjects: true }) as string[])[4], url: require("../../assets/products/trolley/ecofriendly.png") },
        ],
        description_1: tp(t("products:trolley.modal.description1", { returnObjects: true }) as string[], [
          { bold: true, highlight: true },
          {},
          { bold: true },
        ]),
        description_2: tp(t("products:trolley.modal.description2", { returnObjects: true }) as string[], [
          { bold: true },
          {},
        ]),
        descrptionWithDots: (t("products:trolley.modal.dotsItems", { returnObjects: true }) as string[]).map(
          (item) => [{ text: item }]
        ),
        bubbleText: {
          title: t("products:trolley.modal.bubbleTitle"),
          withoutDots: true,
          items: (t("products:trolley.modal.bubbleItems", { returnObjects: true }) as string[][]).map(
            (item) => tp(item, [
              {},
              { highlight: true, bold: true },
              {},
              { highlight: true, bold: true },
              {},
              { highlight: true, bold: true },
              {},
              { bold: true },
              {},
            ])
          ),
        },
      },
    },
    {
      id: ProductId.CP,
      logo: require("../../assets/products/cp/cpLogo.png"),
      image: require("../../assets/products/cp/cpImage.png"),
      textParts: tp(t("products:cp.textParts", { returnObjects: true }) as string[], [
        {},
        { bold: true },
        {},
      ]),
      modalData: {
        imageModal: require("../../assets/products/cp/cpModal.png"),
        video: "https://www.ecofrog.es/wp-content/uploads/2026/02/cp-ecofrogg-app-video-modal.mp4",
        showBubbleLeft: true,
        showBubbleMedium: false,
        title: tp(t("products:cp.modal.title", { returnObjects: true }) as string[], [
          {},
          { bold: true },
          {},
        ]),
        subtitle: tp(t("products:cp.modal.subtitle", { returnObjects: true }) as string[], [
          { bold: true },
          {},
          { bold: true },
          {},
          { bold: true },
        ]),
        icons: [
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[0], url: require("../../assets/products/cp/lessExpenditure.png") },
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[1], url: require("../../assets/products/cp/perfectClothing.png") },
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[2], url: require("../../assets/products/cp/simpleToUse.png") },
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[3], url: require("../../assets/products/cp/toxinFreeEnvironment.png") },
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[4], url: require("../../assets/products/cp/sinDetergentes.png") },
          { legend: (t("products:cp.modal.icons", { returnObjects: true }) as string[])[5], url: require("../../assets/products/cp/easyInstallation.png") },
        ],
        description_1: tp(t("products:cp.modal.description1", { returnObjects: true }) as string[], [
          { bold: true },
          {},
          { bold: true, highlight: true },
        ]),
        description_2: tp(t("products:cp.modal.description2", { returnObjects: true }) as string[], [
          {},
          { bold: true },
          {},
          { bold: true },
          {},
          { highlight: true },
          {},
        ]),
        bubbleText: {
          title: t("products:cp.modal.bubbleTitle"),
          items: (t("products:cp.modal.bubbleItems", { returnObjects: true }) as string[][]).map(
            (item) => tp(item, [{}, { bold: true }, {}])
          ),
        },
      },
    },
    {
      id: ProductId.ELEKTRA,
      logo: require("../../assets/products/elektra/elektraLogo.png"),
      image: require("../../assets/products/elektra/elektraImage.png"),
      textParts: tp(t("products:elektra.textParts", { returnObjects: true }) as string[], [
        { highlight: true, otherColor: "#8D418F" },
        {},
        {},
        {},
        { bold: true },
        {},
        { bold: true },
      ]),
      modalData: {
        video: "https://www.ecofrog.es/wp-content/uploads/2026/02/elektra-ecofrogg-app-video-modal.mp4",
        showBubbleMedium: true,
        title: tp(t("products:elektra.modal.title", { returnObjects: true }) as string[], [
          { highlight: true, otherColor: "#8D418F", bold: true },
          {},
          {},
          {},
          { bold: true },
          {},
          { bold: true },
        ]),
        subtitle: tp(t("products:elektra.modal.subtitle", { returnObjects: true }) as string[], [
          { highlight: true, otherColor: "#8D418F", bold: true },
          {},
          { bold: true },
          {},
        ]),
        icons: [
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[0], url: require("../../assets/products/elektra/minimalDetergentUsage.png") },
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[1], url: require("../../assets/products/elektra/noPlasticWaste.png") },
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[2], url: require("../../assets/products/elektra/preservesColours.png") },
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[3], url: require("../../assets/products/elektra/investmentAndSavings.png") },
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[4], url: require("../../assets/products/elektra/simpleAndEasyOperation.png") },
          { legend: (t("products:elektra.modal.icons", { returnObjects: true }) as string[])[5], url: require("../../assets/products/elektra/allTypesOfSpacesAndSurfaces.png") },
        ],
        description_1: tp(t("products:elektra.modal.description1", { returnObjects: true }) as string[], [
          { highlight: true, otherColor: "#8D418F", bold: true },
          { bold: true },
          {},
          { highlight: true, otherColor: "#8D418F", bold: true },
          { break: true },
          {},
          { bold: true },
          {},
        ]),
        bubbleText: {
          title: t("products:elektra.modal.bubbleTitle"),
          withoutDots: false,
          items: (t("products:elektra.modal.bubbleItems", { returnObjects: true }) as string[][]).map(
            (item, idx) => {
              if (idx === 0) return tp(item, [{}, { otherColor: "#8D418F", highlight: true, bold: true }, {}]);
              return tp(item, [{}]);
            }
          ),
        },
      },
    },
  ];
}
