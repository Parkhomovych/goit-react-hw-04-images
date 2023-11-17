import { styled } from 'styled-components';
import Modal from 'react-modal';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.8)';
Modal.defaultStyles.overlay.border = 'rgba(0, 0, 0, 0.8)';
Modal.setAppElement('#root');
export const MyModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90vw;
  max-height: 90vh;
  height: auto;
  overflow: hidden;
  outline: none;
  border-radius: 8px;

`;
export const ModalImg = styled.img`
  border-radius: 8px;
`;
export const Item = styled.li``;

export const Image = styled.img`
  border-radius: 2px;
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.04);
    cursor: zoom-in;
  }
`;
