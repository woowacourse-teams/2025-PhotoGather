import styled from '@emotion/styled';

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  margin-bottom: 20px;
`;

export const CheckboxContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  input:checked + div {
    background-color: ${({ theme }) => theme.colors.gray06};
    border-color: ${({ theme }) => theme.colors.gray06};
  }

  input:checked + div svg {
    opacity: 1;
  }
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const StyledCheckbox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.gray02};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;

  svg {
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    color: white;
    font-size: 16px;
  }
`;

export const LabelText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray05};
`;
