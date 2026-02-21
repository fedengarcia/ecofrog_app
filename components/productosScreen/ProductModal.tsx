import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Product, TextPart } from "./types";
import { useModal } from "../../context/ModalContext";

const { width, height } = Dimensions.get("window");

interface ProductModalProps {
  visible: boolean;
  product: Product;
  onClose: () => void;
}

export default function ProductModal({
  visible,
  product,
  onClose,
}: ProductModalProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { openContactModal } = useModal();

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
                part.bold && styles.boldText,
                part.highlight && !part.otherColor && styles.highlightText,
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

  if (!product.modalData) {
    return null;
  }

  const {
    title,
    subtitle,
    icons,
    description_1,
    description_2,
    descrptionWithDots,
    bubbleText,
    video,
  } = product.modalData;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              {/* Botón de cerrar */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.headerContainer}>
                <View style={styles.productImageOverlay} />
                <Image
                  source={product.modalData?.imageModal ?? product.image}
                  style={{
                    ...styles.productImage,
                    top: product.id === "cp" ? -80 : -200,
                    left: product.id === "cp" ? -100 : -130,
                  }}
                  resizeMode="contain"
                />
                <View>
                  {/* Logo del producto */}
                  <Image
                    source={product.logo}
                    style={styles.productLogo}
                    resizeMode="contain"
                  />

                  {/* Título */}
                  {renderTextParts(title, styles.title)}

                  {/* Subtítulo */}
                  {product.id !== "cp" &&
                    renderTextParts(subtitle, styles.subtitle)}
                </View>
              </View>
              {/* Subtítulo */}
              {product.id === "cp" &&
                renderTextParts(subtitle, {
                  ...styles.subtitle,
                  width: "100%",
                })}
              {/* Iconos con leyendas */}
              <View
                style={{
                  ...styles.iconsContainer,
                  gap: icons.length <= 5 ? 50 : 25,
                  marginBottom: product.id === "trolley" ? 10 : 25,
                }}
              >
                {icons.map((icon, index) => (
                  <View key={index} style={styles.iconItem}>
                    <Image
                      source={icon.url}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        ...styles.iconLegend,
                        color: product.id === "elektra" ? "#8D418F" : "#00B4D8",
                      }}
                    >
                      {icon.legend}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Layout para CP */}
              {product.id === "cp" ? (
                <View style={styles.cpContainer}>
                  {/* Descripción 1 y 2 */}
                  <View style={styles.cpDescriptionContainer}>
                    {renderTextParts(description_1, styles.cpDescription)}
                    {description_2 &&
                      renderTextParts(description_2, styles.cpDescription)}
                  </View>

                  {/* Bubble images a la izquierda, bubble text a la derecha */}
                  {bubbleText && bubbleText.items && (
                    <View style={styles.cpBubbleTextContainer}>
                      {/* Bubble text a la derecha */}
                      <Text
                        style={{
                          ...styles.bubbleTitle,
                          color: "#00B4D8",
                        }}
                      >
                        {bubbleText.title}
                      </Text>
                      {bubbleText.items.map((item, index) => (
                        <View key={index} style={styles.bubbleItem}>
                          {renderTextParts(item, styles.bubbleText)}
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Video y botón More Info */}
                  {video && (
                    <View style={styles.cpVideoSection}>
                      <TouchableWithoutFeedback onPress={handleVideoPress}>
                        <View style={styles.cpVideoContainer}>
                          <Video
                            ref={videoRef}
                            source={{ uri: video }}
                            style={styles.video}
                            resizeMode={ResizeMode.COVER}
                            shouldPlay={true}
                            isLooping={true}
                            rate={1.0}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableOpacity
                        style={styles.cpMoreInfoButton}
                        onPress={openContactModal}
                      >
                        <Image
                          source={require("../../assets/navbar/mail.png")}
                          style={{ width: 24, height: 24, marginRight: 10 }}
                          resizeMode="contain"
                        />
                        <Text style={styles.moreInfoButtonText}>MORE INFO</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                /* Layout para otros productos */
                <View style={styles.bottomContainer}>
                  {/* Columna izquierda: Descripción y BubbleText */}
                  <View style={styles.leftColumn}>
                    {/* Descripción 1 */}
                    {description_1 &&
                      renderTextParts(description_1, styles.description)}

                    {/* Descripción 2 */}
                    {description_2 &&
                      renderTextParts(description_2, styles.description)}

                    {descrptionWithDots &&
                      descrptionWithDots.map((item, index) => (
                        <View key={index} style={styles.bubbleItem}>
                          <Text
                            style={{
                              ...styles.bubbleBullet,
                              color:
                                product.id === "elektra"
                                  ? "#8D418F"
                                  : "#00B4D8",
                            }}
                          >
                            »
                          </Text>
                          {renderTextParts(item, styles.bubbleText)}
                        </View>
                      ))}

                    {/* BubbleText si existe */}
                    {bubbleText && bubbleText.items && (
                      <View style={styles.bubbleContainer}>
                        <Text
                          style={{
                            ...styles.bubbleTitle,
                            color:
                              bubbleText.title === "Multiple uses"
                                ? "#8D418F"
                                : "#00B4D8",
                          }}
                        >
                          {bubbleText.title}
                        </Text>
                        {bubbleText.items.map((item, index) => (
                          <View key={index} style={styles.bubbleItem}>
                            {!bubbleText.withoutDots && (
                              <Text
                                style={{
                                  ...styles.bubbleBullet,
                                  color:
                                    product.id === "elektra"
                                      ? "#8D418F"
                                      : "#00B4D8",
                                }}
                              >
                                »
                              </Text>
                            )}
                            {renderTextParts(item, styles.bubbleText)}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Columna derecha: Video con botón */}
                  {video && (
                    <View style={styles.rightColumn}>
                      <TouchableWithoutFeedback onPress={handleVideoPress}>
                        <View style={styles.videoContainer}>
                          <Video
                            ref={videoRef}
                            source={{ uri: video }}
                            style={styles.video}
                            resizeMode={ResizeMode.CONTAIN}
                            shouldPlay={true}
                            isLooping={true}
                            rate={1.0}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableOpacity
                        style={{
                          ...styles.moreInfoButton,
                          backgroundColor:
                            product.id === "elektra" ? "#8D418F" : "#00B4D8",
                        }}
                        onPress={openContactModal}
                      >
                        <Image
                          source={require("../../assets/navbar/mail.png")}
                          style={{ width: 24, height: 24, marginRight: 10 }}
                          resizeMode="contain"
                        />
                        <Text style={styles.moreInfoButtonText}>MORE INFO</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              {product.modalData.showBubbleMedium && (
                <Image
                  style={styles.bubbleMedium}
                  source={require("../../assets/products/bubbleMedium.png")}
                />
              )}
              {product.modalData.showBubbleLeft && (
                <Image
                  style={styles.bubbleLeft}
                  source={require("../../assets/products/bubbleMedium.png")}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    maxHeight: height * 0.8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 50,
    paddingTop: 30,
    position: "relative",
  },
  productImage: {
    width: 220,
    position: "absolute",
    top: -200,
    left: -130,
  },
  productImageOverlay: {
    width: 100,
    height: 60,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
  },
  productLogo: {
    width: 350,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "left",
    color: "#000",
    marginBottom: 15,
    fontFamily: "Exo-SemiBold",
    lineHeight: 24,
    width: 500,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "left",
    color: "#666",
    marginBottom: 25,
    width: 500,
    fontFamily: "Exo-Regular",
    lineHeight: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
    marginBottom: 25,
    width: "100%",
  },
  iconItem: {
    width: 80,
    height: 105,
    gap: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 80,
    height: 80,
  },
  iconLegend: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8D418F",
    fontFamily: "Exo-Regular",
    lineHeight: 14,
  },
  description: {
    fontSize: 18,
    textAlign: "left",
    color: "#333",
    marginBottom: 20,
    fontFamily: "Exo-Regular",
    lineHeight: 18,
  },
  bottomContainer: {
    flexDirection: "row",
    gap: 30,
    width: "100%",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  bubbleContainer: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    gap: 5,
    marginTop: 20,
  },
  bubbleItem: {
    flexDirection: "row",
  },
  bubbleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bubbleBullet: {
    fontSize: 18,
    color: "#8D418F",
    marginRight: 10,
    lineHeight: 18,
  },
  bubbleText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Exo-Regular",
    lineHeight: 18,
    textAlign: "left",
  },
  videoContainer: {
    width: "100%",
    height: height * 0.4,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Exo-Regular",
  },
  moreInfoButton: {
    width: "60%",
    height: 60,
    backgroundColor: "#8D418F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: -12,
  },
  moreInfoButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  textPart: {
    fontFamily: "Exo-Regular",
  },
  boldText: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  highlightText: {
    color: "#00B4D8",
    fontFamily: "Exo-Bold",
  },
  bubbleMedium: {
    width: 400,
    height: 400,
    position: "absolute",
    bottom: 0,
    right: 140,
    zIndex: 0,
  },
  bubbleLeft: {
    width: 400,
    height: 400,
    position: "absolute",
    bottom: 80,
    left: -100,
    zIndex: 0,
  },
  // Estilos para CP
  cpContainer: {
    width: "100%",
    gap: 20,
  },
  cpDescriptionContainer: {
    width: "100%",
    gap: 15,
  },
  cpDescription: {
    fontSize: 18,
    textAlign: "left",
    color: "#333",
    fontFamily: "Exo-Regular",
    lineHeight: 16,
  },
  cpBubbleTextContainer: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    alignSelf: "flex-end",
    width: "70%",
  },
  cpVideoSection: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  cpVideoContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cpMoreInfoButton: {
    width: "40%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: -25,
  },
});
