import ImageModule from '../image/Image';
// @ts-ignore
import plus from '@/assets/plus.svg?url';

import {
  StyledModalContainer,
  StyledModalOverlay,
  StyledCloseBtn,
  StyledModalContent,
} from './styledModal';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: <T extends unknown>(e: T) => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, close }) => {
  return isOpen ? (
    <StyledModalContainer>
      <StyledModalOverlay onClick={close} />
      <StyledCloseBtn className="colored" onClick={close}>
        <ImageModule
          src={plus}
          alt="close"
          title="close"
          width={20}
          height={20}
          draggable={false}
        />
      </StyledCloseBtn>
      <StyledModalContent>{children}</StyledModalContent>
    </StyledModalContainer>
  ) : null;
};

export default Modal;
