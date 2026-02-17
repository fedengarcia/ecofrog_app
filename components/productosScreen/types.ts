import { ImageSourcePropType } from "react-native";

export enum ProductId {
  AVATAR = "avatar",
  WASH = "wash",
  TROLLEY = "trolley",
  CP = "cp",
  ELEKTRA = "elektra",
}

export interface TextPart {
  text: string;
  bold?: boolean;
  highlight?: boolean;
  otherColor?: string;
  break?: boolean;
}

export interface Product {
  id: ProductId;
  logo: ImageSourcePropType;
  image: ImageSourcePropType;
  textParts: TextPart[];
  modalData?: {
    title: TextPart[];
    subtitle: TextPart[];
    icons: IconData[];
    description_1: TextPart[];
    description_2?: TextPart[];
    items?: string[];
    bubbleText?: {
      title?: string;
      items: TextPart[][];
    };
    video: string;
    showBubbleLeft?: boolean;
    showBubbleMedium?: boolean;
  };
}

export interface IconData {
  legend: string;
  url: ImageSourcePropType;
}
