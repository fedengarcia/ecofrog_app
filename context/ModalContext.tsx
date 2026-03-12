import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "../components/contactModal/ContactModal";
import EcofrogModal from "../components/ecofrogModal/EcofrogModal";

interface ModalContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
  openEcofrogModal: () => void;
  closeEcofrogModal: () => void;
  openH2O3Modal: () => void;
  closeH2O3Modal: () => void;
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
  const [isH2O3ModalVisible, setIsH2O3ModalVisible] = useState(false);

  const openContactModal = () => setIsContactModalVisible(true);
  const closeContactModal = () => setIsContactModalVisible(false);

  const openEcofrogModal = () => setIsEcofrogModalVisible(true);
  const closeEcofrogModal = () => setIsEcofrogModalVisible(false);

  const openH2O3Modal = () => setIsH2O3ModalVisible(true);
  const closeH2O3Modal = () => setIsH2O3ModalVisible(false);

  return (
    <ModalContext.Provider
      value={{
        openContactModal,
        closeContactModal,
        openEcofrogModal,
        closeEcofrogModal,
        openH2O3Modal,
        closeH2O3Modal,
      }}
    >
      {children}

      <ContactModal
        visible={isContactModalVisible}
        onClose={closeContactModal}
      />

      <EcofrogModal
        visible={isEcofrogModalVisible}
        onClose={closeEcofrogModal}
      />

      <EcofrogModal
        visible={isH2O3ModalVisible}
        onClose={closeH2O3Modal}
        isH2O3={true}
      />
    </ModalContext.Provider>
  );
};
