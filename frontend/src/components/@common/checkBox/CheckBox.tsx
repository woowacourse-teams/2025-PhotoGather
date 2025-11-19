import { MdCheck } from 'react-icons/md';
import * as S from './CheckBox.styles';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({ label, checked, onChange }: CheckBoxProps) => {
  return (
    <S.CheckboxWrapper>
      <S.CheckboxContainer>
        <S.HiddenCheckbox
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <S.StyledCheckbox>
          <MdCheck />
        </S.StyledCheckbox>
      </S.CheckboxContainer>
      {label && <S.LabelText>{label}</S.LabelText>}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;
