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
  light?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  regular?: boolean;
  extraBold?: boolean;
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
