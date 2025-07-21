import { ReactComponent as KakaoTalkIcon } from '@assets/icons/kakaotalk.svg';
import { ReactComponent as LinkIcon } from '@assets/icons/link.svg';
import { ReactComponent as QrIcon } from '@assets/icons/qrCode.svg';
import LinkImage from '@assets/images/rocket.png';
import Button from '../../../components/@common/buttons/button/Button';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import { INFORMATION } from '../../../constants/messages';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
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
      </S.TopContainer>
      <S.BottomContainer>
        <S.ShareContainer>
          <p>친구에게도 알려 주세요</p>
          <S.IconLabelButtonContainer>
            <IconLabelButton
              icon={<LinkIcon />}
              onClick={() => copyLinkToClipboard('예시')}
            />
            <IconLabelButton icon={<QrIcon />} />
            <IconLabelButton
              icon={<KakaoTalkIcon />}
              style={{ backgroundColor: KAKAOTALK_COLOR }}
            />
          </S.IconLabelButtonContainer>
        </S.ShareContainer>
        <Button text="나의 스페이스로 이동" onClick={handleSpaceHomeButton} />
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default SharePage;
