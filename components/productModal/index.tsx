import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  useWindowDimensions,
} from "react-native";
import { Product } from "../../types/products";
import { modalStyles, baseStyles } from "./styles";
import Header from "./Header";
import Icons from "./Icons";
import Columns from "./Columns";

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
  if (!product.modalData) {
    return null;
  }

  const { width, height } = useWindowDimensions();
  const {
    title,
    subtitle,
    icons,
    description_1,
    description_2,
    descrptionWithDots,
    bubbleText,
    video,
    imageModal,
    showBubbleMedium,
    showBubbleLeft,
  } = product.modalData;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[modalStyles.modalContainer, { width: width * 0.8, maxHeight: height * 0.85 }]}>
              {/* Botón de cerrar */}
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={onClose}
              >
                <Text style={modalStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {/* Header */}
              <Header
                productId={product.id}
                logo={product.logo}
                image={product.image}
                imageModal={imageModal}
                title={title}
                subtitle={subtitle}
              />

              {/* Icons */}
              <Icons productId={product.id} icons={icons} />

              {/* Columns (contenido principal) */}
              <Columns
                productId={product.id}
                description_1={description_1}
                description_2={description_2}
                descrptionWithDots={descrptionWithDots}
                bubbleText={bubbleText}
                video={video}
              />

              {/* Burbujas decorativas */}
              {showBubbleMedium && (
                <Image
                  style={baseStyles.bubbleMedium}
                  source={require("../../assets/products/bubbleMedium.png")}
                />
              )}
              {showBubbleLeft && (
                <Image
                  style={baseStyles.bubbleLeft}
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
