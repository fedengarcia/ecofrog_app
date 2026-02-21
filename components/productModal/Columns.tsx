import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import {
  ProductId,
  TextPart,
  BubbleText as BubbleTextType,
} from "../../types/products";
import { columnStyles, cpStyles, baseStyles, getDynamicStyles } from "./styles";
import { useModal } from "../../context/ModalContext";
import TextParts from "./TextParts";
import BubbleText from "./BubbleText";

interface ColumnsProps {
  productId: ProductId;
  description_1: TextPart[];
  description_2?: TextPart[];
  descrptionWithDots?: TextPart[][];
  bubbleText?: BubbleTextType;
  video?: string;
}

export default function Columns({
  productId,
  description_1,
  description_2,
  descrptionWithDots,
  bubbleText,
  video,
}: ColumnsProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { openContactModal } = useModal();
  const dynamicStyles = getDynamicStyles(productId);

  const handleVideoPress = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Layout especial para CP
  if (productId === ProductId.CP) {
    return (
      <View style={cpStyles.cpContainer}>
        {/* Descripción 1 y 2 */}
        <View style={cpStyles.cpDescriptionContainer}>
          <TextParts parts={description_1} baseStyle={cpStyles.cpDescription} />
          {description_2 && (
            <TextParts
              parts={description_2}
              baseStyle={cpStyles.cpDescription}
            />
          )}
        </View>

        {/* Bubble text */}
        {bubbleText && bubbleText.items && (
          <View style={cpStyles.cpBubbleTextContainer}>
            <BubbleText
              bubbleText={bubbleText}
              productId={productId}
              isInsideContainer={false}
            />
          </View>
        )}

        {/* Video y botón More Info */}
        {video && (
          <View style={cpStyles.cpVideoSection}>
            <TouchableWithoutFeedback onPress={handleVideoPress}>
              <View style={cpStyles.cpVideoContainer}>
                <Video
                  ref={videoRef}
                  source={{ uri: video }}
                  style={baseStyles.video}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  rate={1.0}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={cpStyles.cpMoreInfoButton}
              onPress={openContactModal}
            >
              <Image
                source={require("../../assets/navbar/mail.png")}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={baseStyles.moreInfoButtonText}>MORE INFO</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Layout para otros productos (dos columnas)
  return (
    <View style={columnStyles.bottomContainer}>
      {/* Columna izquierda: Descripción y BubbleText */}
      <View style={columnStyles.leftColumn}>
        {/* Descripción 1 */}
        {description_1 && (
          <TextParts
            parts={description_1}
            baseStyle={columnStyles.description}
          />
        )}

        {/* Descripción 2 */}
        {description_2 && (
          <TextParts
            parts={description_2}
            baseStyle={columnStyles.description}
          />
        )}

        {/* Descripción con puntos */}
        {descrptionWithDots &&
          descrptionWithDots.map((item, index) => (
            <View key={index} style={baseStyles.bubbleItem}>
              <Text
                style={{
                  ...baseStyles.bubbleBullet,
                  color: dynamicStyles.bulletColor,
                }}
              >
                »
              </Text>
              <TextParts parts={item} baseStyle={baseStyles.bubbleText} />
            </View>
          ))}

        {/* BubbleText si existe */}
        {bubbleText && bubbleText.items && (
          <BubbleText bubbleText={bubbleText} productId={productId} />
        )}
      </View>

      {/* Columna derecha: Video con botón */}
      {video && (
        <View style={columnStyles.rightColumn}>
          <TouchableWithoutFeedback onPress={handleVideoPress}>
            <View style={columnStyles.videoContainer}>
              <Video
                ref={videoRef}
                source={{ uri: video }}
                style={baseStyles.video}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={true}
                isLooping={true}
                rate={1.0}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={{
              ...columnStyles.moreInfoButton,
              backgroundColor: dynamicStyles.moreInfoButtonColor,
            }}
            onPress={openContactModal}
          >
            <Image
              source={require("../../assets/navbar/mail.png")}
              style={{ width: 24, height: 24, marginRight: 10 }}
              resizeMode="contain"
            />
            <Text style={baseStyles.moreInfoButtonText}>MORE INFO</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
