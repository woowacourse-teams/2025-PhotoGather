import SpaceHeader from '../SpaceHeader';
import * as S from './InboxSpaceHeader.styles';

interface InboxSpaceHeaderProps {
  spaceName: string;
}

const InboxSpaceHeader = ({ spaceName }: InboxSpaceHeaderProps) => {
  return (
    <SpaceHeader>
      <SpaceHeader.Title>수신함 📩</SpaceHeader.Title>
      <S.SpaceName>{spaceName}</S.SpaceName>
    </SpaceHeader>
  );
};

export default InboxSpaceHeader;
