import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 64px;
`;

export const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;

export const ImagePreviewBox = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 4px;
    background-color: #E0E0E0;
    cursor: pointer;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #333333;
`;
