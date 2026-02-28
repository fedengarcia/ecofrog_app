import { StyleSheet, Dimensions } from "react-native";
import { ProductId, getProductColor } from "../../types/products";

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
  },
  moreInfoButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Exo-Bold",
    fontWeight: "700",
  },
  // Bubble estilos
  bubbleItem: {
    flexDirection: "row",
  },
  bubbleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bubbleText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Exo-Regular",
    lineHeight: 18,
    textAlign: "left",
  },
  bubbleBullet: {
    fontSize: 18,
    marginRight: 10,
    lineHeight: 18,
  },
  bubbleContainer: {
    backgroundColor: "#E0E0E0",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    gap: 5,
    marginTop: 20,
  },
  // Decorativas
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
});

// Estilos del Header
export const headerStyles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  productImage: {
    width: 220,
    position: "absolute",
  },
  productImageOverlay: {
    width: 100,
    height: 60,
    backgroundColor: "#fff",
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
    color: "#000000",
    marginBottom: 25,
    width: 500,
    fontFamily: "Exo-Regular",
    lineHeight: 20,
  },
});

// Estilos de los iconos
export const iconStyles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 25,
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
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Exo-Regular",
    lineHeight: 14,
  },
});

// Estilos de las columnas
export const columnStyles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    width: "100%",
    alignItems: "center",
  },
  leftColumn: {
    flex: 1,
    height: "100%",
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  description: {
    fontSize: 18,
    textAlign: "left",
    color: "#000000",
    marginBottom: 20,
    fontFamily: "Exo-Regular",
    lineHeight: 18,
  },
  videoContainer: {
    width: "100%",
    height: height * 0.4,
    backgroundColor: "#000000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
  },
  moreInfoButton: {
    width: "60%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: -12,
  },
});

// Estilos específicos para CP
export const cpStyles = StyleSheet.create({
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
    height: height * 0.75,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 30,
    position: "relative",
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
      top:
        productId === ProductId.CP
          ? -80
          : productId === ProductId.WASH
            ? -70
            : -200,
      left: productId === ProductId.CP ? -100 : -130,
    },
    // Gap de iconos según cantidad
    getIconsGap: (iconsCount: number) =>
      iconsCount <= 5
        ? productId === ProductId.WASH || productId === ProductId.TROLLEY
          ? 15
          : 40
        : 15,
    // Margin bottom según producto
    iconsMarginBottom: productId === ProductId.TROLLEY ? 10 : 25,
    iconWidth:
      productId === ProductId.WASH || productId === ProductId.TROLLEY
        ? 110
        : 95,
  };
};
