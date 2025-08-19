import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
  padding: 120px 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 24px;
align-items: center;
`;

export const TextContainer = styled.p`
  text-align: center;
  white-space: pre-line;
  ${({ theme }) => theme.typography.header03}
  color:  ${({ theme }) => theme.colors.white};
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

export const MockupScrollContainer = styled.section`
  width: calc(${({ theme }) => theme.layout.width} - ${({ theme }) => theme.layout.padding.leftRight});
  display: flex;
  gap: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;     
  -ms-overflow-style: none;   
  &::-webkit-scrollbar { 
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 9999px;
  }
`;

export const MockupItem = styled.div`
  flex: 0 0 auto;

  &:first-of-type {
    margin-left: 30px;
  }

  &:last-of-type{
    margin-right: 30px;
  }
`;
