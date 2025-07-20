import { ReactComponent as KakaoTalkIcon } from '@assets/icons/kakaotalk.svg';
import { ReactComponent as QrIcon } from '@assets/icons/qrCode.svg';
import LinkImage from '@assets/images/link.png';
import Button from '../../../components/@common/buttons/button/Button';
import CopyButton from '../../../components/@common/buttons/copyButton/CopyButton';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import { INFORMATION } from '../../../constants/messages';
import * as S from './SharePage.styles';

const SharePage = () => {
  const KAKAOTALK_COLOR = '#ffeb00'; // 카카오톡 고정색깔

  const handleSpaceHomeButton = () => {
    console.log('클릭');
  };

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.Image src={LinkImage} alt="링크 이미지" />
        <HighlightText
          text={INFORMATION.SUGGEST_SHARE.DESCRIPTION}
          highlightTextArray={[INFORMATION.SUGGEST_SHARE.HIGHLIGHT_TEXT]}
          fontStyle="header02"
          highlightColorStyle="primary"
        />
        <InfoBox
          description={INFORMATION.SHARE_WARNING.DESCRIPTION}
          highlightTextArray={[INFORMATION.SHARE_WARNING.HIGHLIGHT_TEXT]}
        />

        <CopyButton label="친구에게 공유하기" copyText="예시" />

        <S.IconLabelButtonContainer>
          <IconLabelButton icon={<QrIcon />} label="QR생성" />
          <IconLabelButton
            icon={<KakaoTalkIcon />}
            label="카카오톡"
            style={{ backgroundColor: KAKAOTALK_COLOR }}
          />
        </S.IconLabelButtonContainer>
      </S.TopContainer>
      <Button text="나의 스페이스로 이동" onClick={handleSpaceHomeButton} />
    </S.Wrapper>
  );
};

export default SharePage;
