import { useState } from 'react';
import TextInput from '../../../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../../../constants/constraints';
import { INFORMATION } from '../../../../../constants/messages';
import { calculateValidLength } from '../../../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../../funnel/funnel.validators';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';

interface NicknameElementProps {
  receiver: string;
  initialValue: string;
  onNext: (nickname: string) => void;
}

const NicknameElement = ({
  receiver,
  initialValue,
  onNext,
}: NicknameElementProps) => {
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
          placeholder="메세지를 남겨주세요."
          name="description"
          value={nickname}
          onChange={handleChangeNickname}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.MAX_LENGTH.GUESTBOOK.NICKNAME}
        />
      }
      buttonText="전송"
      onNextButtonClick={() => onNext(nickname)}
      nextButtonDisabled={isError}
    />
  );
};

export default NicknameElement;
