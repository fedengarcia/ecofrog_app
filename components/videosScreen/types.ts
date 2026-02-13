import { ImageSourcePropType } from "react-native";

export enum VideoCategoryId {
  RESTAURANTS = "restaurants",
  HOTELS = "hotels",
  EDUCATION_CENTER = "education_center",
  MEDICAL_CENTER = "medical_center",
  CATERING = "catering",
  B2C = "b2c",
}

export interface VideoCategory {
  id: VideoCategoryId;
  title: string;
  description: string;
  icon: ImageSourcePropType;
  backgroundImage: ImageSourcePropType;
  videoUrl: string;
}

export interface WPMediaResponse {
  id: number;
  source_url: string;
  title: {
    rendered: string;
  };
  mime_type: string;
}
