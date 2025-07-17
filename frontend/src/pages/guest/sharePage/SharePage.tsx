import { ReactComponent as QrIcon } from '@assets/icons/qrCode.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import CircularLabelButton from '../../../components/@common/buttons/circularLabelButton/CircularLabelButton';
import CopyButton from '../../../components/@common/buttons/copyButton/CopyButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import * as S from './SharePage.styles';

const SharePage = () => {
  const navigate = useNavigate();
  const handleSpaceHomeButton = () => {
    navigate('/guest/space-home');
  };

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.Image src="" alt="링크 이미지" />
        <HighlightText
          text="스페이스 링크를 공유해 보세요"
          highlightTextArray={['스페이스 링크']}
          fontStyle="header02"
          highlightColorStyle="primary"
        />
        <InfoBox
          description={`내 스페이스 관리 페이지에서도
            스페이스 링크를 확인할 수 있어요`}
          highlightTextArray={['스페이스 링크']}
        />

        <CopyButton label="친구에게 공유하기" copyText="예시" />

        <S.CircularLabelButtonContainer>
          <CircularLabelButton icon={<QrIcon />} label="QR생성" />
          <CircularLabelButton icon={<p>카톡</p>} label="카카오톡" />
        </S.CircularLabelButtonContainer>
      </S.TopContainer>
      <Button text="저장했어요" onClick={handleSpaceHomeButton} />
    </S.Wrapper>
  );
};

export default SharePage;
