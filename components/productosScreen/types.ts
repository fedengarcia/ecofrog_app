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
}

export interface Product {
  id: ProductId;
  logo: ImageSourcePropType;
  image: ImageSourcePropType;
  textParts: TextPart[];
}
