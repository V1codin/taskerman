import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import plus from '@/assets/plus.svg?url';
import Image from 'next/image';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const StyledModalContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #3a3a3a5c;
`;

const StyledModalContent = styled.div`
  position: absolute;
  min-width: 330px;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    transform: rotate(45deg);
  }

  &:hover > img {
    transform: rotate(45deg) scale(1.1);
  }

  &:active > img {
    transform: rotate(45deg) scale(1);
  }
`;

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return isOpen ? (
    <StyledModalContainer>
      <StyledModalOverlay onClick={onClose} />
      <StyledCloseBtn className="colored" onClick={onClose}>
        <Image
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
