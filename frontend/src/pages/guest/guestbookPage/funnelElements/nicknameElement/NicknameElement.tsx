import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../../../constants/constraints';
import { INFORMATION } from '../../../../../constants/messages';
import { ROUTES } from '../../../../../constants/routes';
import type { GuestbookFunnelInfo } from '../../../../../types/domain/guestbook.type';
import { calculateValidLength } from '../../../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../../funnel/funnel.validators';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';

interface NicknameElementProps {
  receiver: string;
  initialValue: string;
  updateFormData: (data: Partial<GuestbookFunnelInfo>) => void;
}

const NicknameElement = ({
  receiver,
  initialValue,
  updateFormData,
}: NicknameElementProps) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(initialValue);
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const { isError, errorMessage } = createErrorMessageWithValidators({
    value: nickname,
    validators: [funnelValidators.nickname.maxLength],
  });
  const validLength = calculateValidLength(nickname);

  return (
    <FunnelBasePage
      isOptional
      prompt={INFORMATION.GUESTBOOK.NICKNAME.PROMPT}
      receiver={receiver}
      element={
        <TextInput
          validLength={validLength}
          label=""
          placeholder="닉네임을 적어주세요"
          name="description"
          value={nickname}
          onChange={handleChangeNickname}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.MAX_LENGTH.GUESTBOOK.NICKNAME}
        />
      }
      buttonText="전송"
      onNextButtonClick={() => {
        updateFormData({ nickname });
        navigate(ROUTES.GUEST.CREATE_GUESTBOOK_COMPLETE, {
          state: {
            receiver: receiver,
            guestNickName: nickname,
          },
        });
      }}
      nextButtonDisabled={isError}
    />
  );
};

export default NicknameElement;
