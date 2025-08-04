import styled from '@emotion/styled';

export const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.overlay};
    backdrop-filter: blur(1.5px);
`;
