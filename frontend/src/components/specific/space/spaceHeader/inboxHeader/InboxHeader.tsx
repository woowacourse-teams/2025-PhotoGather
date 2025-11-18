import SpaceHeader from '../SpaceHeader';
import { SubTitle } from './InboxHeader.styles';

interface InboxHeaderProps {
  /** 스페이스 이름 */
  spaceName: string;
}

const InboxHeader = ({ spaceName }: InboxHeaderProps) => {
  return (
    <SpaceHeader>
      <SpaceHeader.Title>수신함 📩</SpaceHeader.Title>
      <SubTitle>{spaceName}</SubTitle>
    </SpaceHeader>
  );
};

export default InboxHeader;
