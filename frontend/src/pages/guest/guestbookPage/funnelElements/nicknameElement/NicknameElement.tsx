import { useState } from 'react';
import TextInput from '../../../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../../../constants/constraints';
import { INFORMATION } from '../../../../../constants/messages';
import { createRandomNickName } from '../../../../../utils/createRandomNickname';
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
  const [nickname, setNickname] = useState(
    initialValue.length > 0 ? initialValue : createRandomNickName(),
  );

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const { isError, errorMessage } = createErrorMessageWithValidators({
    value: nickname,
    validators: [funnelValidators.nickname.validator],
  });
  const validLength = calculateValidLength(nickname);
  const isDisabled = isError || calculateValidLength(nickname) === 0;

  return (
    <FunnelBasePage
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
      onNextButtonClick={() => onNext(nickname)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default NicknameElement;
