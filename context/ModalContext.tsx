import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "../components/contactModal/ContactModal";

interface ModalContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
  openEcofrogModal: () => void;
  closeEcofrogModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isEcofrogModalVisible, setIsEcofrogModalVisible] = useState(false);

  const openContactModal = () => setIsContactModalVisible(true);
  const closeContactModal = () => setIsContactModalVisible(false);

  const openEcofrogModal = () => setIsEcofrogModalVisible(true);
  const closeEcofrogModal = () => setIsEcofrogModalVisible(false);

  return (
    <ModalContext.Provider
      value={{
        openContactModal,
        closeContactModal,
        openEcofrogModal,
        closeEcofrogModal,
      }}
    >
      {children}

      {/* Modales globales renderizados aquí */}
      <ContactModal
        visible={isContactModalVisible}
        onClose={closeContactModal}
      />

      {/* TODO: Agregar EcofrogModal cuando esté disponible */}
      {/* {isEcofrogModalVisible && (
        <EcofrogModal
          visible={isEcofrogModalVisible}
          onClose={closeEcofrogModal}
        />
      )} */}
    </ModalContext.Provider>
  );
};
