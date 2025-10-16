import type { LocalFile } from '../../../types/file.type';
import IconButton from '../../@common/buttons/iconButton/IconButton';
import ImageSwiper from '../../@common/imageSwiper/ImageSwiper';
import * as S from './ImageSwiperActions.styles';

interface ImageSwiperActionsType {
  icon: React.ReactNode;
  onClick: () => void;
}

interface ImageSwiperActionsProps {
  /** 이미지 정보 */
  imageInfo: LocalFile[];
  /** 초기 인덱스 */
  initialIndex: number;
  /** 현재 인덱스 업데이트 */
  updateCurrentIndex: (index: number) => void;
  /** 액션 버튼 */
  actions: ImageSwiperActionsType[];
  /** 슬라이드 크기 */
  size?: 'default' | 'large';
}

const ImageSwiperActions = ({
  initialIndex,
  updateCurrentIndex,
  imageInfo,
  actions,
  size = 'default',
}: ImageSwiperActionsProps) => {
  return (
    <S.Wrapper>
      <ImageSwiper
        initialIndex={initialIndex}
        imageInfo={imageInfo}
        updateCurrentIndex={updateCurrentIndex}
        size={size}
      />
      <S.ButtonContainer>
        {actions.map((action, index) => (
          <IconButton
            //biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key
            key={index}
            onClick={action.onClick}
            icon={action.icon}
            variant="light"
          />
        ))}
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default ImageSwiperActions;
