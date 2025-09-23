import styled from '@emotion/styled';

export const SpaceName = styled.p`
    ${({ theme }) => ({ ...theme.typography.header03 })};
    color: ${({ theme }) => theme.colors.white};
`;
