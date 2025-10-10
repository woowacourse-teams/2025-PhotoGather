import * as S from './InfoRow.styles';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <S.ContentContainer>
      <S.Label>{label}</S.Label>
      {value === '' ? (
        <S.NoValueText>(미입력)</S.NoValueText>
      ) : (
        <S.Value>{value}</S.Value>
      )}
    </S.ContentContainer>
  );
};

export default InfoRow;
