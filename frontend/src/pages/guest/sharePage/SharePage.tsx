import { useLocation, useNavigate } from 'react-router-dom';
import { LinkIcon, ShareIcon } from '../../../@assets/icons';
import { RocketImg as LinkImage } from '../../../@assets/images';
import Button from '../../../components/@common/buttons/button/Button';
import IconLabelButton from '../../../components/@common/buttons/iconLabelButton/IconLabelButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import { INFORMATION } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';
import useError from '../../../hooks/@common/useError';
import { useToast } from '../../../hooks/@common/useToast';
import useWebShareAPI from '../../../hooks/useWebShareAPI';
import { theme } from '../../../styles/theme';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
import { createShareUrl } from '../../../utils/createSpaceUrl';
import * as S from './SharePage.styles';

const SharePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, spaceCode } = location.state;
  const { showToast } = useToast();
  const { tryTask, tryFetch } = useError();
  const { share } = useWebShareAPI();

  const handleSpaceHomeButton = () => {
    navigate(ROUTES.MANAGER.SPACE_HOME(spaceCode));
  };

  const handleMainButton = () => {
    navigate(ROUTES.MAIN);
  };

  const copyShareLink = () => {
    copyLinkToClipboard(createShareUrl(spaceCode));
    showToast({
      text: '스페이스 공유 링크 복사 완료!',
      type: 'info',
      position: 'top',
    });
  };

  const handleCopyLink = () => {
    tryTask({
      task: copyShareLink,
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 공유 링크 복사에 실패했습니다. 다시 시도해 주세요.',
          position: 'top',
        },
      },
    });
  };

  const handleShare = async () => {
    await tryFetch({
      task: async () =>
        share({
          title: INFORMATION.SHARE_LINK_API.TITLE,
          text: INFORMATION.SHARE_LINK_API.CREATE_TEXT(name),
          url: createShareUrl(spaceCode),
        }),
      errorActions: ['console'],
    });
  };

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.Image src={LinkImage} alt="링크 이미지" />
        <S.TextContainer>
          <HighlightText
            text={INFORMATION.COMPLETE_CREATE.DESCRIPTION}
            highlightTextArray={[INFORMATION.COMPLETE_CREATE.HIGHLIGHT_TEXT]}
            fontStyle="header02"
            highlightColorStyle="primary"
          />
          <HighlightText
            text={INFORMATION.SUGGEST_SHARE.DESCRIPTION}
            highlightTextArray={[INFORMATION.SUGGEST_SHARE.HIGHLIGHT_TEXT]}
            fontStyle="header02"
            highlightColorStyle="primary"
          />
        </S.TextContainer>
        <InfoBox
          description={INFORMATION.SHARE_WARNING.DESCRIPTION}
          highlightTextArray={[INFORMATION.SHARE_WARNING.HIGHLIGHT_TEXT]}
        />
      </S.TopContainer>
      {spaceCode ? (
        <S.BottomContainer>
          <S.ShareContainer>
            <S.ShareLabel>친구에게도 알려 주세요</S.ShareLabel>
            <S.IconLabelButtonContainer>
              <IconLabelButton
                icon={<LinkIcon fill={theme.colors.white} width="20px" />}
                onClick={handleCopyLink}
              />
              <IconLabelButton
                icon={
                  <ShareIcon
                    fill={theme.colors.white}
                    stroke={theme.colors.gray06}
                    width="20px"
                  />
                }
                onClick={handleShare}
              />
            </S.IconLabelButtonContainer>
          </S.ShareContainer>
          <Button text="나의 스페이스로 이동" onClick={handleSpaceHomeButton} />
        </S.BottomContainer>
      ) : (
        <Button text="메인 페이지로 이동" onClick={handleMainButton} />
      )}
    </S.Wrapper>
  );
};

export default SharePage;
