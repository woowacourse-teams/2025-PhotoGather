import { ReactComponent as PrivateIcon } from '@assets/icons/private.svg';
import { ReactComponent as PublicIcon } from '@assets/icons/public.svg';
import type { SpacePublicType } from '../../types/space.type';

interface PublicTypeIconProps {
  /** 설정하는 Type의 종류 */
  publicType: SpacePublicType;
  /** Icon의 색깔 */
  color: string;
}

const PublicTypeIcon = ({ publicType, color }: PublicTypeIconProps) => {
  const PublicTypeIcon = publicType === 'PUBLIC' ? PublicIcon : PrivateIcon;

  return <PublicTypeIcon fill={color} />;
};

export default PublicTypeIcon;
