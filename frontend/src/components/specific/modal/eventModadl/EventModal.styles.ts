import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typography.header03}
`;

export const Description = styled.p`
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray04};
  white-space: pre-wrap;
  text-align: center;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  ${({ theme }) => theme.typography.bodyRegular}
  color: ${({ theme }) => theme.colors.gray04};
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  cursor: pointer;
  appearance: none;
  position: relative;

  &:not(:checked) {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray06};
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.gray06};
    border: 1px solid ${({ theme }) => theme.colors.gray06};
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const CheckboxLabel = styled.div`
  user-select: none;
`;
