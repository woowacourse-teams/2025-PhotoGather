import rocketImage from '@assets/images/rocket.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/@common/buttons/button/Button';
import Input from '../../components/@common/input/Input';
import { ROUTES } from '../../constants/routes';
import * as S from './DemoHome.styles';

const DemoHome = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const updateValue = (value: string) => {
    setValue(value);
  };

  return (
    <S.Wrapper>
      <S.Icon src={rocketImage} alt="데모 페이지 아이콘"></S.Icon>
      <S.Title>Forgather DEMO</S.Title>
      <Button
        text="(GUEST) 스페이스 업로드 페이지"
        onClick={() => navigate(ROUTES.GUEST.IMAGE_UPLOAD)}
      />
      <Button
        text="(MANAGER) 스페이스 관리 페이지 이동"
        onClick={() => navigate(ROUTES.MANAGER.SPACE_HOME)}
      />
      <Input
        maxCount={10}
        value={value}
        onChange={handleChange}
        updateValue={updateValue}
      />
    </S.Wrapper>
  );
};

export default DemoHome;
