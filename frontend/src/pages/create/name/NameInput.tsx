import { useState } from 'react';
import Button from '../../../components/@common/buttons/button/Button';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import Input from '../../../components/@common/input/Input';
import type { BaseFunnelPageProps } from '../../../types/funnel.type';
import * as S from './NameInput.styles';

const NameInput = ({ onNext }: BaseFunnelPageProps) => {
  const [name, setName] = useState('');

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.InfoContainer>
          <HighlightText
            text="스페이스 이름을 정해볼까요?"
            highlightTextArray={['이름']}
            fontStyle="header02"
            highlightColorStyle="primary"
            textAlign="left"
          />
          <S.Info>추억을 담을 공간의 이름을 작성해주세요.</S.Info>
        </S.InfoContainer>
        <Input
          maxCount={10}
          value={name}
          placeholder="나만의 스페이스"
          onChange={(e) => setName(e.target.value)}
        />
      </S.TopContainer>
      <Button onClick={() => onNext(name)} text="다음으로" />
    </S.Wrapper>
  );
};

export default NameInput;
