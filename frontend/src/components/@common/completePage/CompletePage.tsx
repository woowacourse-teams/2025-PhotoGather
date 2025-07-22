import Button from '../buttons/button/Button';
import * as S from './CompletePage.styles';

export type CompletePageType = 'upload' | 'download' | 'spaceCreated';

export const COMPLETE_PAGE_VARIANTS = {
  upload: {
    image: '@assets/images/upload.png',
    title: '추억을 전달했어요',
    description: '업로드가 완료됐어요',
    buttonText: '이어서 업로드하기',
  },
  download: {
    image: '@assets/images/download.png',
    title: '추억을 저장했어요',
    description: '다운로드를 완료했어요',
    buttonText: '나의 스페이스로 이동',
  },
  spaceCreated: {
    image: '@assets/images/space_create.png',
    title: '스페이스가 완성됐어요',
    description: '내 스페이스로 이동해 볼까요?',
    buttonText: '나의 스페이스로 이동',
  },
} as const;

interface CompletePageProps {
  /** 완료 페이지 타입 */
  type: CompletePageType;
}

const CompletePage = ({ type }: CompletePageProps) => {
  const mappedType = COMPLETE_PAGE_VARIANTS[type];

  return (
    <S.Wrapper>
      <img src={mappedType.image} alt={mappedType.title} />
      <h1>{mappedType.title}</h1>
      <p>{mappedType.description}</p>
      <Button text={mappedType.buttonText} onClick={() => console.log(1)} />
    </S.Wrapper>
  );
};

export default CompletePage;
