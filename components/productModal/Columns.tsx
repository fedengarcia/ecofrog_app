import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { ProductId, TextPart, BubbleText } from "../../types/products";
import { columnStyles, cpStyles, baseStyles, getDynamicStyles } from "./styles";
import { useModal } from "../../context/ModalContext";

interface ColumnsProps {
  productId: ProductId;
  description_1: TextPart[];
  description_2?: TextPart[];
  descrptionWithDots?: TextPart[][];
  bubbleText?: BubbleText;
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

  const renderTextParts = (parts: TextPart[], baseStyle: any) => {
    return (
      <Text style={baseStyle}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text
              style={[
                part.bold && baseStyles.boldText,
                part.highlight && !part.otherColor && baseStyles.highlightText,
                part.otherColor && { color: part.otherColor },
              ]}
            >
              {part.text}
            </Text>
            {part.break && "\n"}
          </React.Fragment>
        ))}
      </Text>
    );
  };

  // Layout especial para CP
  if (productId === ProductId.CP) {
    return (
      <View style={cpStyles.cpContainer}>
        {/* Descripción 1 y 2 */}
        <View style={cpStyles.cpDescriptionContainer}>
          {renderTextParts(description_1, cpStyles.cpDescription)}
          {description_2 &&
            renderTextParts(description_2, cpStyles.cpDescription)}
        </View>

        {/* Bubble text */}
        {bubbleText && bubbleText.items && (
          <View style={cpStyles.cpBubbleTextContainer}>
            <Text
              style={{
                ...baseStyles.bubbleTitle,
                color: dynamicStyles.bubbleTitleColor,
              }}
            >
              {bubbleText.title}
            </Text>
            {bubbleText.items.map((item, index) => (
              <View key={index} style={baseStyles.bubbleItem}>
                {renderTextParts(item, baseStyles.bubbleText)}
              </View>
            ))}
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
        {description_1 &&
          renderTextParts(description_1, columnStyles.description)}

        {/* Descripción 2 */}
        {description_2 &&
          renderTextParts(description_2, columnStyles.description)}

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
              {renderTextParts(item, baseStyles.bubbleText)}
            </View>
          ))}

        {/* BubbleText si existe */}
        {bubbleText && bubbleText.items && (
          <View style={baseStyles.bubbleContainer}>
            <Text
              style={{
                ...baseStyles.bubbleTitle,
                color:
                  bubbleText.title === "Multiple uses"
                    ? "#8D418F"
                    : dynamicStyles.bubbleTitleColor,
              }}
            >
              {bubbleText.title}
            </Text>
            {bubbleText.items.map((item, index) => (
              <View key={index} style={baseStyles.bubbleItem}>
                {!bubbleText.withoutDots && (
                  <Text
                    style={{
                      ...baseStyles.bubbleBullet,
                      color: dynamicStyles.bulletColor,
                    }}
                  >
                    »
                  </Text>
                )}
                {renderTextParts(item, baseStyles.bubbleText)}
              </View>
            ))}
          </View>
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
