import * as S from './ComingSoonBox.styles';

interface ComingSoonBoxProps {
  title: string;
}

const ComingSoonBox = ({ title }: ComingSoonBoxProps) => {
  return (
    <S.Wrapper>
      <S.Title>{title || 'Coming Soon'}</S.Title>
    </S.Wrapper>
  );
};

export default ComingSoonBox;
