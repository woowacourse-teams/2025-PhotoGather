import TextInput from '../../../components/@common/inputs/TextInput';
import { CONSTRAINTS } from '../../../constants/constraints';
import useGraphemeInput from '../../../hooks/@common/useGraphemeInput';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/funnelBasePage/FunnelBasePage';

const SpaceNameElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const { handleChange, validValue, validLength } = useGraphemeInput({
    initialValue,
  });
  const isError = validLength > CONSTRAINTS.NAME_MAX_LENGTH;
  const isDisabled = isError || validLength === 0;

  return (
    <FunnelBasePage
      title="스페이스 이름을 정해주세요"
      description="추억을 담을 공간의 이름을 작성해주세요."
      element={
        <TextInput
          maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
          validLength={validLength}
          value={validValue}
          placeholder="나의 첫 스페이스"
          onChange={handleChange}
          errorMessage={
            isError ? '스페이스 이름은 10자 이하로 지을 수 있어요.' : ''
          }
        />
      }
      onNextButtonClick={() => onNext(validValue)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default SpaceNameElement;
