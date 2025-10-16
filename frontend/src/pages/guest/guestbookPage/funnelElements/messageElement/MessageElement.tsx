import { useState } from 'react';
import TextareaInput from '../../../../../components/@common/inputs/textareaInput/TextareaInput';
import { CONSTRAINTS } from '../../../../../constants/constraints';
import { INFORMATION } from '../../../../../constants/messages';
import { calculateValidLength } from '../../../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../../funnel/funnel.validators';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';

interface MessageElementProps {
  receiver: string;
  initialValue: string;
  onNext: (message: string) => void;
}

const MessageElement = ({
  receiver,
  initialValue,
  onNext,
}: MessageElementProps) => {
  const [message, setMessage] = useState(initialValue);
  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const { isError, errorMessage } = createErrorMessageWithValidators({
    value: message,
    validators: [funnelValidators.message.maxLength],
  });

  const isDisabled = isError || calculateValidLength(message) === 0;

  return (
    <FunnelBasePage
      prompt={INFORMATION.GUESTBOOK.MESSAGE.PROMPT}
      receiver={receiver}
      element={
        <TextareaInput
          isRequired={false}
          validLength={calculateValidLength(message)}
          placeholder="메세지를 남겨주세요."
          name="description"
          value={message}
          onChange={handleChangeMessage}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.MAX_LENGTH.GUESTBOOK.MESSAGE}
        />
      }
      onNextButtonClick={() => onNext(message)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default MessageElement;
