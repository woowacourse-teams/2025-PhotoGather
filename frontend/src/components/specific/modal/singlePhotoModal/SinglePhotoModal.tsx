import defaultImage from '../../../../@assets/images/default-forgather-image.png';
import { createImageErrorHandler } from '../../../../utils/createImageErrorHandler';

import Modal from '../../../@common/modal/Modal';
import * as S from './SinglePhotoModal.style';

interface SinglePhotoModalProps {
  onClose: () => void;
  isOpen: boolean;
  imgSrc: string;
}

const SinglePhotoModal = ({
  onClose,
  isOpen,
  imgSrc,
}: SinglePhotoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <S.Wrapper>
        <S.ImageWrapper>
          <S.Image
            src={imgSrc}
            alt="사진"
            onError={createImageErrorHandler(defaultImage)}
          />
        </S.ImageWrapper>
      </S.Wrapper>
    </Modal>
  );
};

export default SinglePhotoModal;
