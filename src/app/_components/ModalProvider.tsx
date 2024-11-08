import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { Dialog } from '@mui/material';

interface ModalContextProps {
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
  };

  const hideModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Dialog open onClose={hideModal}>
          {modalContent}
        </Dialog>
      )}
    </ModalContext.Provider>
  );
};
