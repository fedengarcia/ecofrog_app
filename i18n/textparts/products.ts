import { TFunction } from "i18next";
import { Product, ProductId, TextPart, BubbleText } from "../../types/products";

function tp(texts: string[], styles: Partial<TextPart>[]): TextPart[] {
  return texts.map((text, i) => ({ text, ...styles[i] }));
}

// Videos por idioma
const productVideos: Record<ProductId, { es: string; en: string }> = {
  [ProductId.AVATAR]: {
    es: require("../../assets/products/avatar/avatar_video_es.mp4"),
    en: require("../../assets/products/avatar/avatar_video_en.mp4"),
  },
  [ProductId.WASH]: {
    es: require("../../assets/products/wash/wash_video_es.mp4"),
    en: require("../../assets/products/wash/wash_video_en.mp4"),
  },
  [ProductId.TROLLEY]: {
    es: require("../../assets/products/trolley/trolley_video_es.mp4"),
    en: require("../../assets/products/trolley/trolley_video_en.mp4"),
  },
  [ProductId.CP]: {
    es: require("../../assets/products/cp/cp_video_es.mp4"),
    en: require("../../assets/products/cp/cp_video_es.mp4"),
  },
  [ProductId.ELEKTRA]: {
    es: require("../../assets/products/elektra/elektra_video_es.mp4"),
    en: require("../../assets/products/elektra/elektra_video_en.mp4"),
  },
};

function getVideoUrl(productId: ProductId, language: string): string {
  const lang = language === "es" ? "es" : "en";
  return productVideos[productId][lang];
}

export function getProducts(t: TFunction): Product[] {
  const language = t("language") || "es";

  return [
    {
      id: ProductId.AVATAR,
      logo: require("../../assets/products/avatar/avatarLogo.png"),
      image: require("../../assets/products/avatar/avatarImage.png"),
      textParts: tp(
        t("products:avatar.textParts", { returnObjects: true }) as string[],
        [
          { medium: true },
          { highlight: true },
          { medium: true },
          { bold: true },
        ],
      ),
      modalData: {
        imageModal: require("../../assets/products/avatar/avatarModal.png"),
        video: getVideoUrl(ProductId.AVATAR, language),
        showBubbleMedium: false,
        title: tp(
          t("products:avatar.modal.title", { returnObjects: true }) as string[],
          [
            { medium: true },
            { highlight: true },
            { medium: true },
            { bold: true },
          ],
        ),
        subtitle: tp(
          t("products:avatar.modal.subtitle", {
            returnObjects: true,
          }) as string[],
          [
            { regular: true },
            { highlight: true, bold: true },
            { regular: true },
          ],
        ),
        icons: [
          {
            legend: (
              t("products:avatar.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[0],
            url: require("../../assets/products/avatar/disinfects.png"),
          },
          {
            legend: (
              t("products:avatar.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[1],
            url: require("../../assets/products/avatar/help.png"),
          },
          {
            legend: (
              t("products:avatar.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[2],
            url: require("../../assets/products/avatar/reduce.png"),
          },
          {
            legend: (
              t("products:avatar.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[3],
            url: require("../../assets/products/avatar/save.png"),
          },
          {
            legend: (
              t("products:avatar.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[4],
            url: require("../../assets/products/avatar/consume.png"),
          },
        ],
        description_1: tp(
          t("products:avatar.modal.description1", {
            returnObjects: true,
          }) as string[],
          [
            { regular: true },
            { highlight: true, bold: true },
            { regular: true },
            { highlight: true, bold: true },
            { regular: true },
            { bold: true },
            { regular: true },
          ],
        ),
        description_2: tp(
          t("products:avatar.modal.description2", {
            returnObjects: true,
          }) as string[],
          [{ bold: true }, { regular: true }, { bold: true }],
        ),
        bubbleText: {
          title: t("products:avatar.modal.bubbleTitle"),
          withoutDots: true,
          items: (
            t("products:avatar.modal.bubbleItems", {
              returnObjects: true,
            }) as string[][]
          ).map((item) => tp(item, [{ regular: true }, { bold: true }])),
        },
      },
    },
    {
      id: ProductId.WASH,
      logo: require("../../assets/products/wash/washLogo.png"),
      image: require("../../assets/products/wash/washImage.png"),
      textParts: tp(
        t("products:wash.textParts", { returnObjects: true }) as string[],
        [{ bold: true }, { medium: true }, { highlight: true }],
      ),
      modalData: {
        imageModal: require("../../assets/products/wash/washModal.png"),
        video: getVideoUrl(ProductId.WASH, language),
        showBubbleMedium: false,
        title: tp(
          t("products:wash.modal.title", { returnObjects: true }) as string[],
          [{ bold: true }, { medium: true }, { highlight: true }],
        ),
        subtitle: tp(
          t("products:wash.modal.subtitle", {
            returnObjects: true,
          }) as string[],
          [
            { bold: true, highlight: true },
            { regular: true },
            { bold: true, highlight: true },
            { regular: true },
          ],
        ),
        icons: [
          {
            legend: (
              t("products:wash.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[0],
            url: require("../../assets/products/wash/profitable.png"),
          },
          {
            legend: (
              t("products:wash.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[1],
            url: require("../../assets/products/wash/convenient.png"),
          },
          {
            legend: (
              t("products:wash.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[2],
            url: require("../../assets/products/wash/healthy.png"),
          },
          {
            legend: (
              t("products:wash.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[3],
            url: require("../../assets/products/wash/sustainable.png"),
          },
          {
            legend: (
              t("products:wash.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[4],
            url: require("../../assets/products/wash/ecofriendly.png"),
          },
        ],
        description_1: tp(
          t("products:wash.modal.description1", {
            returnObjects: true,
          }) as string[],
          [
            { regular: true },
            { highlight: true, bold: true },
            { regular: true },
            { bold: true, highlight: true },
            { regular: true },
            { bold: true },
          ],
        ),
        description_2: tp(
          t("products:wash.modal.description2", {
            returnObjects: true,
          }) as string[],
          [{ regular: true }],
        ),
      },
    },
    {
      id: ProductId.TROLLEY,
      logo: require("../../assets/products/trolley/trolleyLogo.png"),
      image: require("../../assets/products/trolley/trolleyImage.png"),
      textParts: tp(
        t("products:trolley.textParts", { returnObjects: true }) as string[],
        [{ medium: true }, { bold: true }],
      ),
      modalData: {
        imageModal: require("../../assets/products/trolley/trolleyModal.png"),
        video: getVideoUrl(ProductId.TROLLEY, language),
        showBubbleMedium: false,
        title: tp(
          t("products:trolley.modal.title", {
            returnObjects: true,
          }) as string[],
          [
            { medium: true },
            { bold: true },
            { medium: true },
            { highlight: true },
          ],
        ),
        subtitle: tp(
          t("products:trolley.modal.subtitle", {
            returnObjects: true,
          }) as string[],
          [
            { regular: true },
            { bold: true, highlight: true },
            { regular: true },
          ],
        ),
        icons: [
          {
            legend: (
              t("products:trolley.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[0],
            url: require("../../assets/products/trolley/useful.png"),
          },
          {
            legend: (
              t("products:trolley.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[1],
            url: require("../../assets/products/trolley/durable.png"),
          },
          {
            legend: (
              t("products:trolley.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[2],
            url: require("../../assets/products/trolley/efficient.png"),
          },
          {
            legend: (
              t("products:trolley.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[3],
            url: require("../../assets/products/trolley/versatile.png"),
          },
          {
            legend: (
              t("products:trolley.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[4],
            url: require("../../assets/products/trolley/ecofriendly.png"),
          },
        ],
        description_1: tp(
          t("products:trolley.modal.description1", {
            returnObjects: true,
          }) as string[],
          [{ bold: true, highlight: true }, { regular: true }, { bold: true }],
        ),
        description_2: tp(
          t("products:trolley.modal.description2", {
            returnObjects: true,
          }) as string[],
          [{ bold: true }, { regular: true }],
        ),
        descrptionWithDots: (
          t("products:trolley.modal.dotsItems", {
            returnObjects: true,
          }) as string[]
        ).map((item) => [{ text: item }]),
      },
    },
    {
      id: ProductId.CP,
      logo: require("../../assets/products/cp/cpLogo.png"),
      image: require("../../assets/products/cp/cpImage.png"),
      textParts: tp(
        t("products:cp.textParts", { returnObjects: true }) as string[],
        [{ medium: true }, { bold: true }],
      ),
      modalData: {
        imageModal: require("../../assets/products/cp/cpModal.png"),
        video: getVideoUrl(ProductId.CP, language),
        showBubbleLeft: false,
        showBubbleMedium: false,
        title: tp(
          t("products:cp.modal.title", { returnObjects: true }) as string[],
          [{ medium: true }, { bold: true }, { medium: true }],
        ),
        subtitle: tp(
          t("products:cp.modal.subtitle", { returnObjects: true }) as string[],
          [
            { bold: true },
            { regular: true },
            { bold: true },
            { regular: true },
            { bold: true },
          ],
        ),
        icons: [
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[0],
            url: require("../../assets/products/cp/lessExpenditure.png"),
          },
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[1],
            url: require("../../assets/products/cp/perfectClothing.png"),
          },
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[2],
            url: require("../../assets/products/cp/simpleToUse.png"),
          },
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[3],
            url: require("../../assets/products/cp/toxinFreeEnvironment.png"),
          },
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[4],
            url: require("../../assets/products/cp/sinDetergentes.png"),
          },
          {
            legend: (
              t("products:cp.modal.icons", { returnObjects: true }) as string[]
            )[5],
            url: require("../../assets/products/cp/easyInstallation.png"),
          },
        ],
        description_1: tp(
          t("products:cp.modal.description1", {
            returnObjects: true,
          }) as string[],
          [{ bold: true }, { regular: true }, { bold: true, highlight: true }],
        ),
        description_2: tp(
          t("products:cp.modal.description2", {
            returnObjects: true,
          }) as string[],
          [
            { regular: true },
            { bold: true },
            { regular: true },
            { highlight: true },
          ],
        ),
        bubbleText: {
          title: t("products:cp.modal.bubbleTitle"),
          items: (
            t("products:cp.modal.bubbleItems", {
              returnObjects: true,
            }) as string[][]
          ).map((item) =>
            tp(item, [{ regular: true }, { bold: true }, { regular: true }]),
          ),
        },
      },
    },
    {
      id: ProductId.ELEKTRA,
      logo: require("../../assets/products/elektra/elektraLogo.png"),
      image: require("../../assets/products/elektra/elektraImage.png"),
      textParts: tp(
        t("products:elektra.textParts", { returnObjects: true }) as string[],
        [{ medium: true }, { bold: true }, { medium: true }, { bold: true }],
      ),
      modalData: {
        video: getVideoUrl(ProductId.ELEKTRA, language),
        showBubbleMedium: false,
        title: tp(
          t("products:elektra.modal.title", {
            returnObjects: true,
          }) as string[],
          [
            { highlight: true, otherColor: "#8D418F", bold: true },
            { medium: true },
            { bold: true },
          ],
        ),
        subtitle: tp(
          t("products:elektra.modal.subtitle", {
            returnObjects: true,
          }) as string[],
          [
            { highlight: true, otherColor: "#8D418F", bold: true },
            { regular: true },
            { bold: true },
          ],
        ),
        icons: [
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[0],
            url: require("../../assets/products/elektra/minimalDetergentUsage.png"),
          },
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[1],
            url: require("../../assets/products/elektra/noPlasticWaste.png"),
          },
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[2],
            url: require("../../assets/products/elektra/preservesColours.png"),
          },
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[3],
            url: require("../../assets/products/elektra/investmentAndSavings.png"),
          },
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[4],
            url: require("../../assets/products/elektra/simpleAndEasyOperation.png"),
          },
          {
            legend: (
              t("products:elektra.modal.icons", {
                returnObjects: true,
              }) as string[]
            )[5],
            url: require("../../assets/products/elektra/allTypesOfSpacesAndSurfaces.png"),
          },
        ],
        description_1: tp(
          t("products:elektra.modal.description1", {
            returnObjects: true,
          }) as string[],
          [
            { highlight: true, otherColor: "#8D418F", bold: true },
            { regular: true },
          ],
        ),
        bubbleText: {
          title: t("products:elektra.modal.bubbleTitle"),
          withoutDots: false,
          items: (
            t("products:elektra.modal.bubbleItems", {
              returnObjects: true,
            }) as string[][]
          ).map((item, idx) => {
            if (idx === 0)
              return tp(item, [
                { regular: true },
                { otherColor: "#8D418F", highlight: true, bold: true },
              ]);
            return tp(item, [{ regular: true }]);
          }),
        },
      },
    },
  ];
}
