import { ImageSourcePropType } from "react-native";

// Enums
export enum ProductId {
  AVATAR = "avatar",
  WASH = "wash",
  TROLLEY = "trolley",
  CP = "cp",
  ELEKTRA = "elektra",
}

// Interfaces
export interface TextPart {
  text: string;
  bold?: boolean;
  highlight?: boolean;
  otherColor?: string;
  break?: boolean;
}

export interface IconData {
  legend: string;
  url: ImageSourcePropType;
}

export interface BubbleText {
  title?: string;
  items: TextPart[][];
  withoutDots?: boolean;
}

export interface ModalData {
  title: TextPart[];
  imageModal?: ImageSourcePropType;
  subtitle: TextPart[];
  icons: IconData[];
  description_1: TextPart[];
  description_2?: TextPart[];
  descrptionWithDots?: TextPart[][];
  items?: string[];
  bubbleText?: BubbleText;
  video: string;
  showBubbleLeft?: boolean;
  showBubbleMedium?: boolean;
}

export interface Product {
  id: ProductId;
  logo: ImageSourcePropType;
  image: ImageSourcePropType;
  textParts: TextPart[];
  modalData?: ModalData;
}

// Función para obtener color según el producto
export const getProductColor = (productId: ProductId): string => {
  switch (productId) {
    case ProductId.ELEKTRA:
      return "#8D418F";
    case ProductId.AVATAR:
    case ProductId.WASH:
    case ProductId.TROLLEY:
    case ProductId.CP:
    default:
      return "#00B4D8";
  }
};

// Datos de los productos
export const PRODUCTS: Product[] = [
  {
    id: ProductId.AVATAR,
    logo: require("../assets/products/avatar/avatarLogo.png"),
    image: require("../assets/products/avatar/avatarImage.png"),
    textParts: [
      { text: "Commit to " },
      { text: "OZONE", highlight: true },
      { text: " in your " },
      { text: "business", bold: true },
    ],
  },
  {
    id: ProductId.WASH,
    logo: require("../assets/products/wash/washLogo.png"),
    image: require("../assets/products/wash/washImage.png"),
    textParts: [
      { text: "Reduce ", bold: true },
      { text: "detergent and rinse aid in your " },
      { text: "commercial dishwasher", highlight: true },
    ],
    modalData: {
      imageModal: require("../assets/products/wash/washModal.png"),
      video:
        "https://www.ecofrog.es/wp-content/uploads/2026/02/wash-ecofrog-app-video-modal.mp4",
      showBubbleMedium: true,
      title: [
        { text: "Reduce ", bold: true },
        { text: "detergent and rinse aid in your " },
        { text: "commercial dishwasher", highlight: true },
      ],
      // WASH
      // connects to industrial dishwashers, giving the
      //  AVATAR
      // system an
      // additional use
      //  in terms of cleaning and degreasing.
      subtitle: [
        { text: "WASH ", bold: true, highlight: true },
        { text: "connects to industrial dishwashers, giving the " },
        { text: "AVATAR ", bold: true, highlight: true },
        { text: "system an " },
        { text: "additional use", bold: true },
        { text: " in terms of cleaning and degreasing." },
      ],
      icons: [
        {
          legend: "Profitable",
          url: require("../assets/products/wash/profitable.png"),
        },
        {
          legend: "Convenient",
          url: require("../assets/products/wash/convenient.png"),
        },
        {
          legend: "Healthy",
          url: require("../assets/products/wash/healthy.png"),
        },
        {
          legend: "Sustainable",
          url: require("../assets/products/wash/sustainable.png"),
        },
        {
          legend: "Ecofriendly",
          url: require("../assets/products/wash/ecofriendly.png"),
        },
      ],

      description_1: [
        { text: "Thanks to the power of " },
        { text: "ozonated water", highlight: true, bold: true },
        { text: " provided by " },
        { text: "AVATAR", bold: true, highlight: true },
        { text: ", it cleans and degreases efficiently, " },
        { text: "reducing the use of detergents and rinse aids", bold: true },
        { text: ", thus becoming a more " },
        {
          text: "environmentally friendly and sustainable system.",
          bold: true,
        },
      ],
      description_2: [
        {
          text: "By reducing the handling of chemicals, occupational risks are reduced, management is facilitated, and storage space is saved. ",
        },
      ],
      bubbleText: {
        title: "Technological improvements to optimize processes ",
        withoutDots: false,

        // » Capacitive sensor for quick and accurate installations.
        // » Watertight casing for durability and safety.
        // » Optimisation of ozonated water distribution.
        items: [
          [
            {
              text: "Capacitive sensor",
              bold: true,
            },
            { text: " for quick and accurate installations." },
          ],
          [
            {
              text: "Watertight casing",
              bold: true,
            },
            { text: " for durability and safety." },
          ],
          [
            {
              text: "Optimisation ",
              bold: true,
            },
            { text: "of " },
            { text: "ozonated water", bold: true, highlight: true },
            { text: " distribution." },
          ],
        ],
      },
    },
  },
  {
    id: ProductId.TROLLEY,
    logo: require("../assets/products/trolley/trolleyLogo.png"),
    image: require("../assets/products/trolley/trolleyImage.png"),
    textParts: [
      { text: "Smart " },
      { text: "portable cleaning", bold: true },
      { text: " with " },
      { text: "ozonated water", highlight: true },
    ],
    modalData: {
      imageModal: require("../assets/products/trolley/trolleyModal.png"),
      title: [
        { text: "Smart " },
        { text: "portable cleaning", bold: true },
        { text: " with " },
        { text: "ozonated water", highlight: true },
      ],
      subtitle: [
        { text: "A" },
        {
          text: " fully integrated, efficient and environmentally",
          bold: true,
        },
        { text: " friendly system that incorporates the " },
        { text: "AVATAR", bold: true, highlight: true },
        { text: " device into a professional cleaning trolley." },
      ],
      icons: [
        {
          legend: "Useful",
          url: require("../assets/products/trolley/useful.png"),
        },
        {
          legend: "Durable",
          url: require("../assets/products/trolley/durable.png"),
        },
        {
          legend: "Efficient",
          url: require("../assets/products/trolley/efficient.png"),
        },
        {
          legend: "Versatile",
          url: require("../assets/products/trolley/versatile.png"),
        },
        {
          legend: "Ecofriendly",
          url: require("../assets/products/trolley/ecofriendly.png"),
        },
      ],
      description_1: [
        { text: "TROLLEY", bold: true, highlight: true },
        {
          text: " 's customisable design, with a wide range of accessories, allows users to create ",
        },
        {
          text: "different configurations that adapt to any space, sector or need.",
          bold: true,
        },
      ],
      description_2: [
        { text: "With a 15-litre water tank, ", bold: true },
        { text: "it provides optimum autonomy for large areas." },
      ],
      descrptionWithDots: [
        [{ text: "Hotels, hostels, flats" }],
        [{ text: "Residences for elderly or students" }],
        [{ text: "Hospitals, health centres" }],
        [{ text: "Educational centres" }],
        [{ text: "Restaurants, bars, cafés, canteens" }],
        [{ text: "Department stores, supermarkets" }],
        [{ text: "Sports centres" }],
        [{ text: "Offices, studios" }],
      ],
      bubbleText: {
        title: "Two brands, one common vision",
        withoutDots: true,
        items: [
          [
            {
              text: "The collaboration between ",
            },
            {
              text: "ECOFROG ",
              highlight: true,
              bold: true,
            },
            {
              text: "and ",
            },
            {
              text: "FILMOP ",
              highlight: true,
              bold: true,
            },
            {
              text: "combines",
            },
            {
              text: "AVATAR",
              highlight: true,
              bold: true,
            },
            {
              text: " technology with the versatility of",
            },
            {
              text: "Alpha.",
              highlight: true,
              bold: true,
            },
            {
              text: " A portable solution for large areas committed to effective and sustainable hygiene.",
            },
          ],
        ],
      },
      showBubbleMedium: true,

      video:
        "https://www.ecofrog.es/wp-content/uploads/2026/02/trolley-ecofrogg-app-video-modal.mp4",
    },
  },
  {
    id: ProductId.CP,
    logo: require("../assets/products/cp/cpLogo.png"),
    image: require("../assets/products/cp/cpImage.png"),
    textParts: [
      { text: "For " },
      { text: "large volumes", bold: true },
      { text: " of water" },
    ],
    modalData: {
      imageModal: require("../assets/products/cp/cpModal.png"),
      title: [
        { text: "For " },
        { text: "large volumes", bold: true },
        { text: " of water" },
      ],
      subtitle: [
        { text: "Commercial Purifier ", bold: true },
        { text: "is perfect for " },
        {
          text: "industrial laundries, car wash tunnels",
          bold: true,
        },
        {
          text: " and all types of surfaces, ",
        },
        { text: "minimising the use of chemical products", bold: true },
      ],
      icons: [
        {
          legend: "Less expenditure",
          url: require("../assets/products/cp/lessExpenditure.png"),
        },
        {
          legend: "Perfect clothing",
          url: require("../assets/products/cp/perfectClothing.png"),
        },
        {
          legend: "Simple to use",
          url: require("../assets/products/cp/simpleToUse.png"),
        },
        {
          legend: "Toxin-free environment ",
          url: require("../assets/products/cp/toxinFreeEnvironment.png"),
        },
        {
          legend: "sin detergentes",
          url: require("../assets/products/cp/sinDetergentes.png"),
        },
        {
          legend: "Easy installation",
          url: require("../assets/products/cp/easyInstallation.png"),
        },
      ],
      description_1: [
        { text: "Commercial Purifier ", bold: true },
        {
          text: "is designed to work with water flows exceeding the capacity of ",
        },
        { text: "AVATAR.", bold: true, highlight: true },
      ],
      description_2: [
        { text: "Developed for " },
        {
          text: "industrial washing machines over 10 kg, ",
          bold: true,
        },
        { text: "it " },
        {
          text: "reduces energy and water consumption, ",
          bold: true,
        },
        {
          text: "minimises the use of chemical products and extends the useful life of the machines. Also for ",
        },
        {
          text: "car wash tunnels and rotating cleaning machinery, ",
          highlight: true,
        },
        {
          text: "ensuring hygiene and disinfection with less chemical impact and greater care for garments. ",
        },
      ],
      bubbleText: {
        title: "More safety",
        items: [
          [
            { text: "It has a " },
            {
              text: "water leak detector ",
              bold: true,
            },
            {
              text: "and removes limescale build-up from pipes and washing machines. ",
            },
          ],
        ],
      },
      video:
        "https://www.ecofrog.es/wp-content/uploads/2026/02/cp-ecofrogg-app-video-modal.mp4",
      showBubbleLeft: true,
      showBubbleMedium: false,
    },
  },
  {
    id: ProductId.ELEKTRA,
    logo: require("../assets/products/elektra/elektraLogo.png"),
    image: require("../assets/products/elektra/elektraImage.png"),
    textParts: [
      { text: "Ozonated water", highlight: true, otherColor: "#8D418F" },
      { text: " also at " },
      { text: "home" },
      { text: "for " },
      { text: "household cleaning", bold: true },
      { text: " and " },
      { text: "laundry", bold: true },
    ],
    modalData: {
      title: [
        {
          text: "Ozonated water",
          highlight: true,
          otherColor: "#8D418F",
          bold: true,
        },
        { text: " also at " },
        { text: "home" },
        { text: "for " },
        { text: "household cleaning", bold: true },
        { text: " and " },
        { text: "laundry", bold: true },
      ],
      subtitle: [
        { text: "ELEKTRA", highlight: true, otherColor: "#8D418F", bold: true },
        { text: " allows you to clean and disinfect" },
        {
          text: " any room in the house and wash clothes",
          bold: true,
        },
        {
          text: " with ozonated water without the need for chemical products.",
        },
      ],
      icons: [
        {
          legend: "Minimal detergent usage",
          url: require("../assets/products/elektra/minimalDetergentUsage.png"),
        },
        {
          legend: "No plastic waste generated",
          url: require("../assets/products/elektra/noPlasticWaste.png"),
        },
        {
          legend: "Preserves colours in cold water",
          url: require("../assets/products/elektra/preservesColours.png"),
        },
        {
          legend: "Investment and savings at home",
          url: require("../assets/products/elektra/investmentAndSavings.png"),
        },
        {
          legend: "Simple and easy operation",
          url: require("../assets/products/elektra/simpleAndEasyOperation.png"),
        },
        {
          legend: "All types of spaces and surfaces",
          url: require("../assets/products/elektra/allTypesOfSpacesAndSurfaces.png"),
        },
      ],
      description_1: [
        { text: "ELEKTRA", highlight: true, otherColor: "#8D418F", bold: true },
        {
          text: " reduces cleaning product and energy consumption costs ",
          bold: true,
        },
        { text: "as it is effective in cold water. Its system " },
        {
          text: "ozonises",
          highlight: true,
          otherColor: "#8D418F",
          bold: true,
        },
        {
          text: " the water instantly, avoiding storage and contamination risks.",
          break: true,
        },
        {
          text: "It is 100% environmentally friendly, ",
        },
        { text: "eliminates fungus and bacteria", bold: true },
        {
          text: " and protects colours and neutralises odours in domestic washing.",
        },
      ],
      bubbleText: {
        title: "Multiple uses",
        withoutDots: false,
        items: [
          [
            { text: "Laundry connecting " },
            {
              text: "ELEKTRA ",
              otherColor: "#8D418F",
              highlight: true,
              bold: true,
            },
            { text: "to domestic wash machine" },
          ],
          [
            {
              text: "Floors, walls, sinks, windows, furniture, tiles, joints, screens... ",
            },
          ],
          [
            {
              text: "Extractor hoods, ovens, refrigerators, countertops, stoves, fryers, appliances... ",
            },
          ],
          [
            {
              text: "Rooms or surfaces previously cleaned with chemical products.",
            },
          ],
        ],
      },
      video:
        "https://www.ecofrog.es/wp-content/uploads/2026/02/elektra-ecofrogg-app-video-modal.mp4",
      showBubbleMedium: true,
    },
  },
];
