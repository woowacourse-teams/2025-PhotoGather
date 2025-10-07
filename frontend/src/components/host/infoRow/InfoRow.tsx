import * as S from './InfoRow.styles';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <S.ContentContainer>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
      {value === '' && <S.NoValueText>(미입력)</S.NoValueText>}
    </S.ContentContainer>
  );
};

export default InfoRow;
