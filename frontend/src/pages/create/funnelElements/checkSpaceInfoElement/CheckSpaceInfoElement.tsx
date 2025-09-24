import { useNavigate } from 'react-router-dom';
import AccessTypeIcon from '../../../../components/@common/accessTypeIcon/AccessTypeIcon';
import LeftTimeInformationBox from '../../../../components/specific/leftTimeInformationBox/LeftTimeInformationBox';
import { INFORMATION } from '../../../../constants/messages';
import { ROUTES } from '../../../../constants/routes';
import useLeftTimer from '../../../../hooks/@common/useLeftTimer';
import useAgreements from '../../../../hooks/domain/useAgreements';
import useCreateSpace from '../../../../hooks/useCreateSpace';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { SpaceFunnelInfo } from '../../../../types/space.type';
import { calculateKstToday } from '../../../../utils/calculateKstToday';
import { formatDate } from '../../../../utils/formatDate';
import { formatTimer } from '../../../../utils/formatTimer';
import { parseIsoStringFromDateTime } from '../../../../utils/parseIsoStringFromDateTime';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './CheckSpaceInfoElement.styles';

interface CheckSpaceInfoPageProps extends FunnelElementProps<boolean> {
  spaceInfo: SpaceFunnelInfo;
}

const CheckSpaceInfoElement = ({
  spaceInfo,
  onNext,
}: CheckSpaceInfoPageProps) => {
  const navigate = useNavigate();

  const openedAt = `${spaceInfo.date}T${spaceInfo.time}`;
  const { date, time } = formatDate(openedAt);
  const { leftTime } = useLeftTimer({ targetTime: openedAt });
  const formattedLeftTime = formatTimer(leftTime);
  const isImmediateOpen = formattedLeftTime === '00:00:00';
  const { isAgree } = useAgreements();
  const isNotAgreed =
    !isAgree &&
    (!spaceInfo.agreements?.agreedToPrivacy ||
      !spaceInfo.agreements?.agreedToService);

  const { isCreating, fetchCreateSpace } = useCreateSpace();
  const { kstDateString, kstTimeString } = calculateKstToday();
  const calculatedOpenedAt =
    spaceInfo.isImmediateOpen || isImmediateOpen
      ? parseIsoStringFromDateTime(kstDateString, kstTimeString)
      : parseIsoStringFromDateTime(spaceInfo.date, spaceInfo.time);

  const createSpaceRedirect = async () => {
    const spaceCode = await fetchCreateSpace({
      name: spaceInfo.name,
      validHours: 72,
      openedAt: calculatedOpenedAt,
      type: spaceInfo.accessType,
    });
    if (!spaceCode) return;

    onNext(isImmediateOpen);
    navigate(ROUTES.GUEST.SHARE, {
      state: { name: spaceInfo.name, spaceCode },
    });
  };

  const createText = () => {
    if (isCreating) '생성 중';
    if (isNotAgreed) return '동의하지 않은 약관이 있습니다.';
    return '생성하기';
  };

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.CHECK_SPACE_INFO.TITLE.TEXT,
        highlightTextArray: [INFORMATION.CHECK_SPACE_INFO.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.CHECK_SPACE_INFO.DESCRIPTION}
      element={
        <LeftTimeInformationBox
          title={
            <S.TitleContainer>
              <S.Title>{spaceInfo.name}</S.Title>
              <AccessTypeIcon accessType={spaceInfo.accessType} color="black" />
            </S.TitleContainer>
          }
          openDate={{ date, time }}
          leftTime={formattedLeftTime}
        />
      }
      onNextButtonClick={async () => {
        await createSpaceRedirect();
      }}
      nextButtonDisabled={isCreating || isNotAgreed}
      buttonText={createText()}
    />
  );
};

export default CheckSpaceInfoElement;
