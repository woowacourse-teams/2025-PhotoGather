import styled from '@emotion/styled';

export const Wrapper = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray03};
    background-color: ${({ theme }) => theme.colors.white};
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25));
`;
