import { StyleSheet, Dimensions } from "react-native";
import { ProductId, getProductColor } from "../../types/products";
import { scale, verticalScale, moderateScale } from "../../utils/scaling";

const { width, height } = Dimensions.get("window");

// Estilos base compartidos
export const baseStyles = StyleSheet.create({
  // Estilos de texto
  boldText: {
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  highlightText: {
    color: "#00B4D8",
    fontFamily: "Exo-Bold",
  },
  // Estilos de video
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  moreInfoButtonText: {
    color: "#fff",
    fontSize: moderateScale(18, 0.3),
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  // Bubble estilos
  bubbleItem: {
    flexDirection: "row",
  },
  bubbleTitle: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "bold",
  },
  bubbleText: {
    fontSize: moderateScale(18, 0.3),
    color: "black",
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(18, 0.3),
    textAlign: "left",
  },
  bubbleBullet: {
    fontSize: moderateScale(18, 0.3),
    marginRight: scale(10),
    lineHeight: moderateScale(18, 0.3),
  },
  bubbleContainer: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    padding: scale(20),
    borderRadius: moderateScale(10, 0.5),
    gap: scale(5),
    marginTop: verticalScale(20),
  },
  // Decorativas
  bubbleMedium: {
    width: scale(400),
    height: scale(400),
    position: "absolute",
    bottom: 0,
    right: scale(140),
    zIndex: 0,
  },
  bubbleLeft: {
    width: scale(400),
    height: scale(400),
    position: "absolute",
    bottom: verticalScale(80),
    left: scale(-100),
    zIndex: 0,
  },
});

// Estilos del Header
export const headerStyles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  productImage: {
    width: scale(220),
    position: "absolute",
  },
  productImageOverlay: {
    width: scale(100),
    height: verticalScale(60),
    backgroundColor: "#fff",
  },
  productLogo: {
    width: scale(350),
    height: verticalScale(120),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(28, 0.3),
    textAlign: "left",
    color: "#000",
    marginBottom: verticalScale(15),
    fontFamily: "Exo-SemiBold",
    lineHeight: moderateScale(24, 0.3),
    width: scale(500),
  },
  subtitle: {
    fontSize: moderateScale(20, 0.3),
    textAlign: "left",
    color: "#000000",
    marginBottom: verticalScale(25),
    width: scale(500),
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(20, 0.3),
  },
});

// Estilos de los iconos
export const iconStyles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingBottom: verticalScale(25),
  },
  iconItem: {
    width: scale(80),
    height: verticalScale(105),
    gap: scale(8),
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  icon: {
    width: scale(80),
    height: scale(80),
  },
  iconLegend: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(14, 0.3),
  },
});

// Estilos de las columnas
export const columnStyles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    gap: scale(30),
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
  description: {
    fontSize: moderateScale(18, 0.3),
    textAlign: "left",
    color: "#000000",
    marginBottom: verticalScale(20),
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(18, 0.3),
  },
  videoContainer: {
    width: "100%",
    height: height * 0.4,
    backgroundColor: "#000000",
    borderRadius: moderateScale(10, 0.5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(15),
    position: "relative",
    overflow: "hidden",
  },
  moreInfoButton: {
    width: "60%",
    height: verticalScale(60),
    borderRadius: moderateScale(10, 0.5),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: verticalScale(0),
  },
});

// Estilos específicos para CP
export const cpStyles = StyleSheet.create({
  cpContainer: {
    width: "100%",
    gap: scale(20),
  },
  cpDescriptionContainer: {
    width: "100%",
    gap: scale(15),
  },
  cpDescription: {
    fontSize: moderateScale(18, 0.3),
    textAlign: "left",
    color: "#333",
    fontFamily: "Exo-Regular",
    lineHeight: moderateScale(16, 0.3),
  },
  cpBubbleTextContainer: {
    backgroundColor: "#E0E0E0",
    padding: scale(10),
    borderRadius: moderateScale(10, 0.5),
    gap: scale(5),
    alignSelf: "flex-end",
    width: "70%",
  },
  cpVideoSection: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginBottom: verticalScale(20),
  },
  cpVideoContainer: {
    width: "100%",
    height: verticalScale(220),
    backgroundColor: "#000",
    borderRadius: moderateScale(10, 0.5),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cpMoreInfoButton: {
    width: "40%",
    height: verticalScale(50),
    backgroundColor: "black",
    borderRadius: moderateScale(10, 0.5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: verticalScale(-25),
  },
});

// Estilos del modal principal
export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    height: height * 0.8,
    backgroundColor: "#fff",
    borderRadius: moderateScale(20, 0.5),
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(20),
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: verticalScale(15),
    right: scale(15),
    zIndex: 10,
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20, 0.5),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: moderateScale(24, 0.3),
    color: "#333",
    fontWeight: "bold",
  },
});

// Función para obtener estilos dinámicos según el producto
export const getDynamicStyles = (productId: ProductId) => {
  const color = getProductColor(productId);

  return {
    iconLegendColor: color,
    bulletColor: color,
    moreInfoButtonColor: color,
    bubbleTitleColor: color,
    // Posiciones específicas de imagen según producto
    productImagePosition: {
      top: verticalScale(
        productId === ProductId.CP
          ? -80
          : productId === ProductId.WASH
            ? -70
            : -150,
      ),
      left: scale(productId === ProductId.CP ? -100 : -130),
    },
    // Gap de iconos según cantidad
    getIconsGap: (iconsCount: number) =>
      scale(
        iconsCount <= 5
          ? productId === ProductId.WASH || productId === ProductId.TROLLEY
            ? 15
            : 40
          : 15,
      ),
    // Margin bottom según producto
    iconsMarginBottom: verticalScale(
      productId === ProductId.TROLLEY
        ? -35
        : productId === ProductId.WASH
          ? -10
          : 25,
    ),
    iconWidth: scale(
      productId === ProductId.WASH || productId === ProductId.TROLLEY ? 90 : 80,
    ),
  };
};
