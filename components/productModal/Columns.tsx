import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import {
  ProductId,
  TextPart,
  BubbleText as BubbleTextType,
} from "../../types/products";
import { columnStyles, cpStyles, baseStyles, getDynamicStyles } from "./styles";
import { useModal } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";
import TextParts from "./TextParts";
import BubbleText from "./BubbleText";
import { scale, moderateScale } from "../../utils/scaling";

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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { openContactModal } = useModal();
  const { t } = useTranslation("common");
  const dynamicStyles = getDynamicStyles(productId);

  const toggleMute = async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(newMutedState);
    }
  };

  // Resetear estado de carga cuando cambia el video
  useEffect(() => {
    if (video) {
      setIsVideoLoading(true);
    }
  }, [video]);

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
                  volume={1.0}
                  isMuted={isMuted}
                  onReadyForDisplay={() => setIsVideoLoading(false)}
                  onLoadStart={() => setIsVideoLoading(true)}
                  onError={() => setIsVideoLoading(false)}
                />
                {isVideoLoading && (
                  <View style={videoLoadingStyles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#00B4D8" />
                  </View>
                )}
                <TouchableOpacity
                  style={videoLoadingStyles.muteButton}
                  onPress={toggleMute}
                >
                  <Text style={videoLoadingStyles.muteButtonText}>
                    {isMuted ? "🔇" : "🔊"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={cpStyles.cpMoreInfoButton}
              onPress={openContactModal}
            >
              <Image
                source={require("../../assets/navbar/mail.png")}
                style={{
                  width: scale(24),
                  height: scale(24),
                  marginRight: scale(10),
                }}
                resizeMode="contain"
              />
              <Text style={baseStyles.moreInfoButtonText}>
                {t("buttons.moreInfo")}
              </Text>
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
            baseStyle={{
              ...columnStyles.description,
              fontSize: dynamicStyles.descriptionFontSize,
              lineHeight: dynamicStyles.descriptionLineHeight,
            }}
          />
        )}

        {/* Descripción 2 */}
        {description_2 && (
          <TextParts
            parts={description_2}
            baseStyle={{
              ...columnStyles.description,
              fontSize: dynamicStyles.descriptionFontSize,
              lineHeight: dynamicStyles.descriptionLineHeight,
            }}
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
                  fontSize: dynamicStyles.bubbleTextFontSize,
                  lineHeight: dynamicStyles.bubbleTextLineHeight,
                }}
              >
                »
              </Text>
              <TextParts
                parts={item}
                baseStyle={{
                  ...baseStyles.bubbleText,
                  fontSize: dynamicStyles.bubbleTextFontSize,
                  lineHeight: dynamicStyles.bubbleTextLineHeight,
                }}
              />
            </View>
          ))}

        {/* BubbleText si existe */}
        {bubbleText && bubbleText.items && (
          <BubbleText bubbleText={bubbleText} productId={productId} />
        )}
      </View>

      {/* Columna derecha: Video con botón */}
      <View style={columnStyles.rightColumn}>
        <TouchableWithoutFeedback onPress={handleVideoPress}>
          <View style={columnStyles.videoContainer}>
            {video ? (
              <Video
                ref={videoRef}
                source={{ uri: video }}
                style={baseStyles.video}
                resizeMode={ResizeMode.COVER}
                shouldPlay={true}
                isLooping={true}
                volume={1.0}
                isMuted={isMuted}
                rate={1.0}
                onReadyForDisplay={() => setIsVideoLoading(false)}
                onLoadStart={() => setIsVideoLoading(true)}
                onError={() => setIsVideoLoading(false)}
              />
            ) : null}
            {(isVideoLoading || !video) && (
              <View style={videoLoadingStyles.loadingOverlay}>
                <ActivityIndicator size="large" color="#00B4D8" />
              </View>
            )}
            <TouchableOpacity
              style={videoLoadingStyles.muteButton}
              onPress={toggleMute}
            >
              <Text style={videoLoadingStyles.muteButtonText}>
                {isMuted ? "🔇" : "🔊"}
              </Text>
            </TouchableOpacity>
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
            style={{
              width: scale(24),
              height: scale(24),
              marginRight: scale(10),
            }}
            resizeMode="contain"
          />
          <Text style={baseStyles.moreInfoButtonText}>
            {t("buttons.moreInfo")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const videoLoadingStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: moderateScale(15, 0.5),
    zIndex: 10,
    elevation: 10,
  },
  muteButton: {
    position: "absolute",
    top: scale(10),
    right: scale(10),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: scale(20),
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  muteButtonText: {
    fontSize: scale(20),
  },
});
