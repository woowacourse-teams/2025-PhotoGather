import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const Receiver = styled.p`
  ${({ theme }) => ({
    ...theme.typography.bodyLarge,
  })}
  color: ${({ theme }) => theme.colors.gray06};
  width: 100%;
`;

export const Prompt = styled.h1`
  ${({ theme }) => ({
    ...theme.typography.header02,
  })}
  color: ${({ theme }) => theme.colors.gray06};
  width: 100%;
`;

export const Optional = styled.span`
  color: ${({ theme }) => theme.colors.gray04};
  ${({ theme }) => ({
    ...theme.typography.bodyLarge,
  })}
`;
