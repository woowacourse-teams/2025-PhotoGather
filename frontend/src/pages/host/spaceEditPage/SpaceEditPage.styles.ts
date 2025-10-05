import styled from '@emotion/styled';

export const Wrapper = styled.div`
  
`;

export const Title = styled.h1`
${({ theme }) => theme.typography.header02};
color: ${({ theme }) => theme.colors.gray06};
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 16px;
`;
