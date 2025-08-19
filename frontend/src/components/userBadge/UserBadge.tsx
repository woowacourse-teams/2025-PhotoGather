import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { theme } from '../../styles/theme';
import * as S from './UserBadge.styles';

interface UserBadgeProps {
  nickName: string;
}

const UserBadge = ({ nickName }: UserBadgeProps) => {
  return (
    <S.Wrapper>
      <S.NickName>{nickName}</S.NickName>
      <EditIcon fill={theme.colors.white} width={16} />
    </S.Wrapper>
  );
};

export default UserBadge;
