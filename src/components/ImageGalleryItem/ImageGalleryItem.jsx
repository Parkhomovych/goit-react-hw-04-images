import { useState } from 'react';
import { Item } from './ImageGalleryItem.style';
import { Image } from './ImageGalleryItem.style';
import { MyModal, ModalImg } from './ImageGalleryItem.style';

export const ImageGalleryItem = ({ photo, tags, modalPhoto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handlerModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Item>
      <Image onClick={handlerModal} src={photo} alt={tags} />
      {isOpen && (
        <MyModal isOpen={isOpen} onRequestClose={handlerModal}>
          <ModalImg src={modalPhoto} alt={tags} />
        </MyModal>
      )}
    </Item>
  );
};
